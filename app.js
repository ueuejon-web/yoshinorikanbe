/* -------------------------------------------------------------
 * 神戸 義憲 公式ホームページ - スクリプト
 * スクロール監視による要素のフェードインやナビゲーション効果
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. スクロール時に要素をフェードインさせるIntersection Observerの設定
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 一度フェードインしたら監視を解除してパフォーマンスを向上
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.01, // 長いセクションでも初回表示で発火しやすくする
        rootMargin: '0px 0px -10% 0px'
    });

    fadeElements.forEach(el => {
        fadeOnScrollObserver.observe(el);
    });

    // 初回ロード時に可視範囲へ入っている要素を確実に表示する
    const activateVisibleFadeElements = () => {
        fadeElements.forEach(el => {
            if (el.classList.contains('active')) return;

            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.98 && rect.bottom > 0;
            if (isVisible) {
                el.classList.add('active');
                fadeOnScrollObserver.unobserve(el);
            }
        });
    };

    activateVisibleFadeElements();
    window.addEventListener('load', activateVisibleFadeElements);
    window.addEventListener('resize', activateVisibleFadeElements);

    // 2. ヘッダーのスクロールエフェクト（少しスクロールしたら背景を濃くする）
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1.5rem 4rem';
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        } else {
            header.style.padding = '2.5rem 4rem';
            header.style.backgroundColor = 'transparent';
        }
    });
});
