export default function rippleEffect (event) {
  event.stopPropagation();
  const target = event.currentTarget;

  if (!target.querySelector(".effect-element")) {
    const effectElement = document.createElement("div");
    effectElement.classList.add("effect-element");
    effectElement.style.top = `${event.layerY || event.nativeEvent.layerY}px`;
    effectElement.style.left = `${event.layerX || event.nativeEvent.layerX}px`;
    target.appendChild(effectElement);
    effectElement.animate({
      opacity: 0
    }, { fill: "forwards", duration: 700 });
    setTimeout(() => {
      target.querySelector(".effect-element").remove();
    }, 700);
  }
};