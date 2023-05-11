/*const content = document.querySelector("#content");

// When the user scrolls, check if they've reached the end of the first section
document.addEventListener("scroll", function() {
      fetch("index2.html")
        .then(response => response.text())
        .then(data => {
          content.innerHTML = data;
        });
  });*/

const element = document.querySelector('.side-picture');
const footer = document.querySelector('footer');

/**
 * Return `num` normalized to 0..1 in range min..max.
 * @param {number} num 
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
function scale(num, min, max) {
  if (num < min) return 0;
  if (num > max) return 1;
  return (num - min) / (max - min);
}

/**
* Return `num` transformed from the normalised 0..1 form back to the min..max form.
* @param {number} num 
* @param {number} min 
* @param {number} max 
* @returns number
*/
function toAbsolute(num, min, max) {
if (num < 0) return min;
if (num > 1) return max;
return num * (max - min) + min;
}


window.addEventListener('scroll', () =>{
  const scrollBottomPosition = window.scrollY + window.innerHeight;
  const footerPosition = footer.offsetTop;
  const footerVisibleHeight = Math.abs(footerPosition - scrollBottomPosition);

  const maxScroll = document.body.offsetHeight - window.innerHeight;
  const normalizedScrollHeight = scale(window.scrollY, 0, maxScroll);

  if(element){
    //the disk changes its rotation based on how much of the page has been scrolled
    element.style.transform = `translateX(-40%) rotate(${normalizedScrollHeight * 180}deg)`;

    //If the footer is visible, the disk changes its position based on how much of the footer is visible
    // and stops moving with the scroll
    if (scrollBottomPosition >= footerPosition) {
      element.style.bottom = footerVisibleHeight + 30 + 'px';
      element.style.top = 'auto';
    } else {
      element.style.top =  '25%';
      element.style.bottom = 'auto';
    }
  }
});