function showPage(pageId) {
    document.querySelectorAll('.screen-page').forEach(page => {
        page.classList.remove('active-page');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
    }
}

function showGallery(category) {
    const galleryTitle = document.getElementById('gallery-title');
    const mediaContainer = document.getElementById('media-container');
    
    // Clear view container
    mediaContainer.innerHTML = '';
    
    if (category === 'photography') {
        galleryTitle.textContent = '// PRODUCTION PHOTOGRAPHY REEL';
        
        // Loop generation to render all 12 images instantly
        for (let i = 1; i <= 12; i++) {
            const assetCard = document.createElement('div');
            assetCard.className = 'asset-frame clickable-asset';
            assetCard.onclick = () => openLightbox(`p${i}.jpg`, 'image');
            
            assetCard.innerHTML = `
                <img src="p${i}.jpg" alt="Capture Asset ${i}" onerror="this.parentNode.innerHTML='<span class=\\'placeholder-text\\'>[ CAPTURE ASSET p${i} ]</span>'">
                <div class="asset-hover-tag">VIEW CAPTURE // 0${i}</div>
            `;
            mediaContainer.appendChild(assetCard);
        }
    } else if (category === 'edits') {
        galleryTitle.textContent = '// VISUAL CUTS & SEQUENCING REEL';
        
        // --- DATA OBJECT FOR YOUR VIDEOS ---
        // REPLACE THE 'YOUTUBE_ID_HERE' WITH THE ACTUAL CODES FROM YOUR YOUTUBE LINKS
        const videoAssets = [
    { type: 'local', src: 'v1.mp4', label: 'CREATIVE TIMELINE // 01' },
    { type: 'local', src: 'v2.mp4', label: 'CREATIVE TIMELINE // 02' },
    { type: 'local', src: 'v3.mp4', label: 'CREATIVE TIMELINE // 03' },
    { type: 'youtube', id: 'ie8DnPV20Yw', label: 'BEANBAGG EXPERIENCE // 1 MIN' },
    { type: 'youtube', id: 'MaWyvmrS1fA', label: 'AMUL CASE STUDY // 10 MIN' }
         ];

        videoAssets.forEach((video) => {
            const assetCard = document.createElement('div');
            assetCard.className = 'asset-frame clickable-asset video-card';
            
            if (video.type === 'local') {
                assetCard.onclick = () => openLightbox(video.src, 'video');
                assetCard.innerHTML = `
                    <video src="${video.src}" muted loop autoplay playsinline style="width:100%; height:100%; object-fit:cover;"></video>
                    <div class="asset-hover-tag">${video.label} // PLAY CUT</div>
                `;
            } else {
                // Generates a high-quality YouTube thumbnail preview automatically
                const thumbUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                assetCard.onclick = () => openLightbox(video.id, 'youtube');
                assetCard.innerHTML = `
                    <img src="${thumbUrl}" alt="Client Video Thumbnail" style="width:100%; height:100%; object-fit:cover; filter: grayscale(30%);">
                    <div class="video-play-indicator">▶ STREAM REEL</div>
                    <div class="asset-hover-tag">${video.label}</div>
                `;
            }
            mediaContainer.appendChild(assetCard);
        });
    }
}

// ADVANCED UNIVERSAL LIGHTBOX ENGINE (IMAGES + LOCAL VIDEO + YOUTUBE STREAMING)
function openLightbox(target, mediaType) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    
    // Close lightbox if clicking outside content frame
    overlay.onclick = (e) => {
        if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
            overlay.remove();
        }
    };
    
    let contentMarkup = '';
    
    if (mediaType === 'image') {
        contentMarkup = `<img src="${target}" alt="Fullscreen View" style="max-width:100%; max-height:80vh; object-fit:contain;">`;
    } else if (mediaType === 'video') {
        contentMarkup = `
            <video src="${target}" controls autoplay playsinline style="max-width:90vw; max-height:80vh; border: 1px solid rgba(255,255,255,0.15);"></video>
        `;
    } else if (mediaType === 'youtube') {
        contentMarkup = `
            <div class="youtube-player-wrapper">
                <iframe src="https://www.youtube.com/embed/${target}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    }
    
    overlay.innerHTML = `
        <div class="lightbox-content">
            ${contentMarkup}
            <div class="lightbox-close">✕ CLOSE TERMINAL</div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

document.addEventListener("DOMContentLoaded", () => {
    showGallery('photography');
});