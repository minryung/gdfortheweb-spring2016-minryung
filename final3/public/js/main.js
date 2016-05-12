function $ (selector, el) {
  if (!el) {el = document;}
  return el.querySelector(selector);
}
function $$ (selector, el, cb) {
  if (!el) {el = document;}
  var elts = el.querySelectorAll(selector);
  if (cb) [].forEach.call(elts, cb);
  return elts;
}


// The project currently opened (or null if none)
var openedProject = null;

// Thumbnails display / hide functions
var displayImage = function(image){
  var durl = image.getAttribute('data-url');
  image.setAttribute('src', durl);
  image.classList.add('displayed');
}
var hideImage = function(image){
  var durl = image.getAttribute('data-url');
  image.setAttribute('src', '');
  image.classList.remove('displayed');
}

var openProject = function(project) {
  // The project is already open
  if (openedProject === project) return;
  // If a project is already opened, we close it before opening the new one
  if (openedProject !== null) closeProject(openedProject);
  // ...and the opened project is now this one
  openedProject = project;
  // We pass `project` as a second parameter of $$ here, because we only want
  // the images of this project
  projectLink = project.previousElementSibling;
  projectLink.classList.add('opened');
  var img = $$('.img-list img', project),
      totalimg = img.length,
      items = $$('.item', project),
      totalitems = items.length,
      i = j = 0,
      serialDisplayImage = function(image) {
    return function() {
      displayImage(image);
    };
  };
  while (i < totalitems) {
    items[i].classList.add('displayed');
    i++;
  }
  while (j < totalimg) {
    window.setTimeout(
      serialDisplayImage(img[j]),
    50 * j
    );
    j++;
  }
}

var closeProject = function(project) {
  // No opened project anymore
  openedProject = null;
  // We pass `project` as a second parameter of $$ here, because we only want
  // the images of this project.
  projectLink = project.previousElementSibling;
  projectLink.classList.remove('opened');
  var img = $$('.img-list img', project),
      totalimg = img.length,
      items = $$('.item', project),
      totalitems = items.length,
      i = j = k = 0,
      serialHideImage = function(image) {
        return function() {
          hideImage(image);
        };
      };
  closeText(projectLink)
  closeImage(projectLink);
  while (j < totalimg) {
    window.setTimeout(
      serialHideImage(img[j]),
      5 * j
    );
    j++;
  }
  if (j === totalimg ){
    while (k < totalitems) {
      items[k].classList.remove('displayed');
      k++;
    }
  }

}

// Init the links behavior for projects links
function initLinks(projectLinks) {
  // Vintage browsers: normal links
  if (!window.history.pushState) return;
  var i = projectLinks.length;
  // Click on a project link
  var clickProjectLink = function(projectLink) {
    return function(event) {
      event.preventDefault();
      var project = projectLink.nextElementSibling;
      if(openedProject === project){
        closeProject(project);
      }else{
        openProject(project);
        window.history.pushState(null, '', projectLink.href);
      }
    };
  };
  while (i--) {
    projectLinks[i].addEventListener('click', clickProjectLink(projectLinks[i]), false);
  }
}


var openedImage = null;

var openImage = function(imageLink){
  // The image is already open
  if (openedImage === imageLink) return;
  // If an image is already opened, we close it before opening the new one
  if (openedImage !== null) closeImage(openedImage);
  // ...and the opened project is now this one
  openedImage = imageLink;
  // Enlarge image
  var linkSrc = imageLink.getAttribute('href'),
      imgTag = imageLink.querySelector('img');
  imgTag.setAttribute('src', linkSrc);
  imgTag.classList.add('enlarged');
}

var closeImage = function(imageLink) {
  // No opened project anymore
  openedImage = null;
  // Close images
  var imgs = imageLink.parentNode.querySelectorAll('img'),
      totalimg = imgs.length,
      i = 0;

  while (i < totalimg) {
    var  thumbSrc = imgs[i].getAttribute('data-url');
    imgs[i].setAttribute('src', thumbSrc);
    imgs[i].classList.remove('enlarged');
    i++;
  }
}
var closeText = function(projectLink) {
  var text = projectLink.parentNode.querySelector('.project-content .text-content');
  text.classList.remove('enlarged');
}

// Init the links behavior for images
function initImgLinks(imageLinks) {
  var i = imageLinks.length;
  // Click on an image link
  var clickImageLink = function(imageLink) {
    return function(event) {
      event.preventDefault();
      var image = imageLink;
      openImage(image);
    };
  };
  while (i--) {
    imageLinks[i].addEventListener('click', clickImageLink(imageLinks[i]), false);
  }
}

// Init the links behavior for text content
function initText(text) {
  var i = text.length;
  var clickText = function(text) {
    return function(event) {
      event.preventDefault();
      text.classList.add('enlarged')
    };
  };
  while (i--) {
    text[i].addEventListener('click', clickText(text[i]), false);
  }
}

// Add a click event on each project link
initLinks($$('.project-link'));
// Add a click event on each image link
initImgLinks($$('.img-list a'));
// Add a click event on each content text boxes
initText($$('.text-content'));


// Change all hrefs and srcs attributes to absolute, in order to permit
// the usage of history.pushState()
function absolutify() {
  $$('[href]', null, function(elt) {
    elt.href = elt.href;
  });
  $$('[src]', null, function(elt) {
    elt.src = elt.src;
  });
  // We are using a link to resolve relative URLs to their absolute
  // equivalents. This link is not added to the document.
  var resolver = document.createElement('a');
  $$('[data-url]', null, function(elt) {
    resolver.href = elt.getAttribute('data-url');
    elt.setAttribute('data-url', resolver.href);
  });
}


// Fix Stacey URLs
if (window.history.pushState) {
  absolutify();
}

// If the path is a project, open it
// We are searching for an a.project-link with an href attribute
// which ends (the $ sign in the selector) by the path.
// We have to do this because Stacey use (crazy) relative links for pages.
var path = window.location.pathname;
var currentProjectLink = $('a.project-link[href$="'+ path +'"]');
// We don’t want links ending by / (they are all ending by /).
if (currentProjectLink && path !== '/') {
  openProject(currentProjectLink.nextElementSibling);
}

// Open About
var opened = false,
    box = $('.credit-box'),
    wh = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight,   
    ww = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;     

function openBox(){
  if (opened === false){
    box.classList.add('opened');
    opened = true;
  }else{
    box.classList.remove('opened');
    opened = false;
  }
}

$('.credits').addEventListener('click', openBox, false);
$('.close').addEventListener('click', openBox, false);

box.style.width = ww -100 + "px";
box.style.minHeight = wh -100 + "px";