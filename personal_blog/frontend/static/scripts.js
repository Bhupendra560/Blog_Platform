
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const blogPostsContainer = document.getElementById("blog-posts");

    // Function to create and append a blog post element
    function createBlogPostElement(post) {
        const blogPostElement = document.createElement("div");
        blogPostElement.classList.add("blog-post");

        // Populating data
        searchInput.value = "";
        blogPostElement.innerHTML = `
            <h2 class= "limited-lines-title">${post.title}</h2>
            <p class= "limited-lines">${post.description}</p>
            <p align="right"><b>Published Date : ${getFormatedDate(post.published_date)}</b></p>
        `;
        return blogPostElement;
    }

    async function fetchData() {
        try {
            const response = await fetch('/blog/get/', {
                method: 'GET',
            });
    
            const data = await response.json();
            // console.log(data);
    
            // Creating and appending new blog posts
            blogPostsContainer.innerHTML = "";
            data.forEach(blogPost => {
                const blogPostElement = createBlogPostElement(blogPost);
                blogPostsContainer.appendChild(blogPostElement);
    
                // Find & Add click event listener to title within the blogPostElement
                const titleElement = blogPostElement.querySelector('h2');
                titleElement.addEventListener("click", function () {
                    handleTitleClick(blogPost);
                });
            });
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    // Calling the fetchData function
    fetchData();


    if (searchInput !== null) {
        searchInput.addEventListener("input", function () {

            const searchTerm = searchInput.value.toLowerCase();
            const blogPosts = blogPostsContainer.getElementsByClassName("blog-post");
            for (const blogPost of blogPosts) {
                const title = blogPost.querySelector("h2").textContent.toLowerCase();
                const shouldShow = title.includes(searchTerm);
                blogPost.style.display = shouldShow ? "block" : "none";
            }
        });

    };


    //--------------------------------------------------------------------

    function handleTitleClick(blogPost) {
        // console.log('clicked title :', blogPost.id + " ", blogPost.title);
        window.location.href = `/personal-blog/detail_view/${blogPost.id}/`;
    }

    function getFormatedDate(timestamp_data) {
        const date = new Date(timestamp_data);
        // Extracting date components
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

});
