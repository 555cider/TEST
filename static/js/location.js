document.querySelectorAll('.direction ul li').forEach(ele => ele.addEventListener('click', function () {
    const activeTab = this.dataset.tab;
    for (const item of document.querySelectorAll('.direction ul li')) {
        item.classList.remove('current');
    }
    for (const detail of document.querySelectorAll('.direction-detail')) {
        detail.classList.remove('current');
    }
    this.classList.add('current');
    document.getElementById(activeTab).classList.add('current');
}));