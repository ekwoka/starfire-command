// intercept all links from same origin and ajax replace the main element

export function init(selecter = 'a') {
  console.log('init');
  link();
}

export async function navigateTo(url) {
  if (!url || url.includes('http')) return;
  await turbo(url);
  link();
}

function link() {
  const links = document.querySelectorAll('a');
  add(links);
}

// function to find A elements target and fetch the url

async function fetchUrl(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
    window.location = url;
  }
}

// parse data into dom elements and return the main

function parse(data) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const main = doc.querySelector('main');
  return main;
}

// function to loop through array of elements to add listener to each click

function add(elements) {
  elements.forEach((e) => e.addEventListener('click', click));
}

// function to take url and replace the main element with the new content

function click(e) {
  const url = e.target.href;
  if (!url || url.includes('http')) return;
  e.preventDefault();
  turbo(url);
}

async function turbo(url) {
  console.time('turbo');
  document.querySelector('main').classList.add('opacity-60','pointer-events-none')
  let body = await fetchUrl(url);
  if (!body) return;
  let main = parse(body);
  document.querySelector('main').replaceWith(main);
  history.pushState(null, 'Starfire', url);
  console.timeEnd('turbo');
}
