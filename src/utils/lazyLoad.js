export default function lazyLoad() {
    const options = { root: document, rootMargin: '0px 0px 20px 0px', threshold: 0.5 };

    const lazyObserver = new IntersectionObserver(entries =>
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.classList.remove('lazy');
                lazyObserver.unobserve(entry.target);
            }
        }), options
    );

    const lazyImages = Array.from(document.querySelectorAll("img.lazy"));
    lazyImages.forEach(el => lazyObserver.observe(el));
}