export default function lazyLoad(options = {}) {
    const { root = document, rootMargin = '500px', threshold = 0 } = options;

    var lazyImageWrappers = [].slice.call(
        root.querySelectorAll('.img-wrapper.lazy')
    );

    if ('IntersectionObserver' in window) {
        const observerCallback = (entries) =>
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // entry가 뷰포트(root)에 보여질 때(isIntersecting),
                    // 이미지 src를 data-src에서 가져오고
                    // 이미지가 load될 때 placeholder 제거
                    const lazyImage = entry.target.querySelector('img');
                    const placeholder = entry.target.querySelector('.img-placeholder');

                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy'); // lazy 클래스 제거
                    lazyImage.onload = () => {
                        placeholder.classList.add('fade-out');
                        placeholder.ontransitionend = () => placeholder.remove();
                    };
                    lazyImageObserver.unobserve(entry.target); // lazy load를 마친 후 entry unobserve하기
                }
            });
        
        let lazyImageObserver = new IntersectionObserver(
            observerCallback,
            {
                root,
                rootMargin,
                threshold,
            }
        );

        lazyImageWrappers.forEach(function (lazyImageWrapper) {
            lazyImageObserver.observe(lazyImageWrapper);
        });
    } else {
    // 미지원일 경우 scrollEvent로 레이지로드 적용
    // Possibly fall back to event handlers here
    }
}