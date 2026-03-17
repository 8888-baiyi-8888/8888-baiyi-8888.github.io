// 预留给后续扩展的前端脚本。
// 目前仅负责自动给外链加上安全属性。
(function () {
  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
})();
