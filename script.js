let searchHistory = [];

function search(type) {
    const song = document.getElementById('song').value;
    const artist = document.getElementById('artist').value;
    let url;

    if (type === 'wiki') {
        url = `https://ja.chordwiki.org/search.html#gsc.tab=0&gsc.q=${encodeURIComponent(song + ' ' + artist)}`;
    } else if (type === 'google') {
        url = `https://ja.chordwiki.org/search2.html#gsc.tab=0&gsc.q=${encodeURIComponent(song + ' ' + artist)}`;
    } else if (type === 'youtube') {
        url = `https://www.youtube.com/results?search_query=${encodeURIComponent(song + ' ' + artist)}`;
    }

    window.open(url, '_blank');
    addToHistory(song, artist);
}

function addToHistory(song, artist) {
    const newEntry = { song, artist, date: new Date().toLocaleString() };
    const isDuplicate = searchHistory.some(item => 
        item.song === song && item.artist === artist
    );
    
    if (!isDuplicate) {
        searchHistory.push(newEntry);
        updateHistoryList();
    }
}

function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    searchHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.date}: ${item.song} - ${item.artist}`;
        historyList.appendChild(li);
    });
}

function downloadCSV() {
    let csv = 'Date,Song,Artist\n';
    searchHistory.forEach(item => {
        csv += `${item.date},${item.song},${item.artist}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'search_history.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}