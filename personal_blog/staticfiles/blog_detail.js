
document.addEventListener("DOMContentLoaded", function () {

    const blogPostsContainer = document.getElementById("blog-details");
    const headerElement = document.getElementById('page_header');
    const headElement = document.getElementById('head_element');
    
    function createBlogPostElement(post) {

        const blogPostElement = document.createElement("div");
        blogPostElement.classList.add("main-detailed");
        blogPostElement.innerHTML = `
            <p>${post.description}</p>
        `;
        return blogPostElement;
    }

    async function fetchData() {
        try {
            const blog_post_id = getPostId()
            // console.log("blog postId : ",blog_post_id)

            if (blog_post_id !== null) {
                const response = await fetch(`/blog/get/${blog_post_id}/`, {
                    method: 'GET',
                });
                const data = await response.json();
                // console.log(data);

                // Creating and appending clicked blog 
                blogPostsContainer.innerHTML = "";
                const blogPostElement = createBlogPostElement(data);
                blogPostsContainer.appendChild(blogPostElement);

                const HeaderElement = headerElement.querySelector('h1');
                HeaderElement.classList.add("limited-lines-title");
                HeaderElement.textContent = data.title;

                const titleElement = headElement.querySelector('title');
                titleElement.textContent = data.title;
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Calling the fetchData function
    fetchData();

    //--------------------------------------------------------------------

    function getPostId() {
        const urlPath = window.location.pathname;
        const pathSegments = urlPath.split('/');
        const idSegmentIndex = pathSegments.indexOf('detail_view') + 1;
        const postId = idSegmentIndex < pathSegments.length ? pathSegments[idSegmentIndex] : null;
        return postId;
    }
    
});