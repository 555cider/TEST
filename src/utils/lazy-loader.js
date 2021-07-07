export function lazyLoader() {
    const options = { root: document, rootMargin: '0px 0px 10px 0px', threshold: 0.5 };

    const lazyObserver = new IntersectionObserver(entries =>
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('lazy');
                lazyObserver.unobserve(entry.target);
            }
        }), options);

    document.querySelectorAll("img.lazy").forEach(el => lazyObserver.observe(el));
}