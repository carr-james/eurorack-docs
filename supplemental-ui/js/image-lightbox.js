// Fancybox integration for expandable images
document.addEventListener('DOMContentLoaded', function() {
  // Check if jQuery and Fancybox are loaded
  if (typeof jQuery === 'undefined' || typeof jQuery.fancybox === 'undefined') {
    console.error('jQuery or Fancybox not loaded');
    return;
  }

  // Only process images with .expandable class
  document.querySelectorAll('.imageblock.expandable').forEach(function(imageblock) {
    const img = imageblock.querySelector('img');
    if (!img) return;

    // Wrap image in a link for Fancybox
    const link = document.createElement('a');
    link.href = img.src;
    link.setAttribute('data-fancybox', 'gallery');
    link.setAttribute('data-caption', img.alt || '');

    // Add expandable class for styling
    link.classList.add('fancybox-expandable');

    // Insert link wrapper
    img.parentNode.insertBefore(link, img);
    link.appendChild(img);

    // Add expand icon overlay
    const icon = document.createElement('div');
    icon.innerHTML = '⤢'; // Expand icon
    icon.className = 'fancybox-expand-icon';
    icon.style.cssText = 'position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.7);color:white;padding:8px 12px;border-radius:4px;font-size:20px;pointer-events:none;opacity:0.7;transition:opacity 0.2s;z-index:1;';

    // Wrap link in positioned container for icon placement
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;display:inline-block;';
    link.parentNode.insertBefore(wrapper, link);
    wrapper.appendChild(link);
    wrapper.appendChild(icon);

    // Show icon on hover
    wrapper.addEventListener('mouseenter', function() {
      icon.style.opacity = '1';
    });
    wrapper.addEventListener('mouseleave', function() {
      icon.style.opacity = '0.7';
    });
  });

  // Initialize Fancybox with transformation tools enabled
  jQuery('[data-fancybox="gallery"]').fancybox({
    loop: true,
    keyboard: true,
    arrows: true,
    infobar: true,
    toolbar: true,
    buttons: [
      'zoom',
      'slideShow',
      'fullScreen',
      'download',
      'thumbs',
      'close'
    ],
    // Enable image transformation
    image: {
      preload: true
    },
    // Allow wheel to zoom
    wheel: 'zoom'
  });
});
