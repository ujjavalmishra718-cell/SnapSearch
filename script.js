const accessKey='_aWXGiBQyvtkajFbvCPJ35we0Tu_DKeQpDe0poazd5g';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const emptyState = document.querySelector('.empty-state');

let page=1;

//function to fetch images using unsplash API
const fetchImages = async (query, pageNo) => {

    try{
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=27&page=${pageNo}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();
        
        if(pageNo === 1){
            imagesContainer.innerHTML = '';

            // Hide empty state
            emptyState.style.display = 'none';
        }

        if(data.results.length > 0){
            data.results.forEach(photo => {
                //creating image div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

                //creating overlay
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                //creating overlay text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;

                overlayElement.appendChild(overlayText);
                imageElement.appendChild(overlayElement);
                imagesContainer.appendChild(imageElement);
            });

            if(data.total_pages === pageNo){
                loadMoreBtn.style.display="none";
            }
            else{
                loadMoreBtn.style.display="block";
                
            }
        }
        else{
            imagesContainer.innerHTML = `
            <div class="empty-state">
            <h2>No Images Found</h2>
            <p>Try searching with another keyword</p>
            </div>`;

            loadMoreBtn.style.display = "none";
        }
    }
    catch (error){
        imagesContainer.innerHTML=`
            <h2>Image fetching failed! Try Again.</h2>
            `;

            loadMoreBtn.style.display='none';
    }
}


//adding event listener to search
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText !==''){
        page=1;
        fetchImages(inputText, page);
    }
    else{
        imagesContainer.innerHTML = `<h2>No Images Found.</h2>`;
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }
});


//adding event for load more button
loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});