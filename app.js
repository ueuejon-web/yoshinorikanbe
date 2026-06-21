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
        threshold: 0.15, // 要素の15%が見えたらフェードイン開始
        rootMargin: '0px 0px -50px 0px' // 少し早めにアニメーションを開始させるためのマージン
    });

    fadeElements.forEach(el => {
        fadeOnScrollObserver.observe(el);
    });

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
