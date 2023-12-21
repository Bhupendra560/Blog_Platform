// document.addEventListener("DOMContentLoaded", function () {
    // Your username and password for basic authentication
    // const username = 'bhupendra';
    // const password = 'bhupendra560';

    // // Combine username and password into a single string
    // const credentials = `${username}:${password}`;

    // // Encode the credentials using base64
    // const encodedCredentials = btoa(credentials);

    // // Set up the headers for the fetch request
    // const headers = new Headers({
    //     'Authorization': `Basic ${encodedCredentials}`,
       
    // });



    // async function fetchData() {
    //     try {
    //         const response = await fetch('/blog/homepage/', {
    //             method: 'GET',
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    
    //         const data = await response.json();
    //         console.log(data);
    
    //         // Processing the data and generate HTML
    //         const blogPostsContainer = document.getElementById('blog-posts');

    //         function createBlogPostElement(post) {
    //             const blogPostElement = document.createElement('div');
    //             blogPostElement.className = 'blog-post';

    //             const timestamp = new Date(post.published_date);
    //             // Extracting date components
    //             const year = timestamp.getFullYear();
    //             const month = (timestamp.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    //             const day = timestamp.getDate().toString().padStart(2, '0');

    //             // Format date as "YYYY-MM-DD"
    //             const formattedDate = `${year}-${month}-${day}`;

    //             // -------------------------------------------------------

    //             const titleElement = document.createElement('h2');
    //             titleElement.textContent = post.title;

    //             const descriptionElement = document.createElement('p');
    //             descriptionElement.textContent = post.description;
    //             descriptionElement.classList.add('limited-lines');


    //             const publishedDateContainer = document.createElement('p');
    //             publishedDateContainer.setAttribute('align', 'right');
    //             const publishedDateText = document.createElement('span');
    //             publishedDateText.textContent = "Published Date: ";
    //             publishedDateText.style.fontWeight = 'bold'; // Optional: Apply styling to the label
    //             const publishedDateElement = document.createElement('span');
    //             publishedDateElement.textContent = formattedDate;

    //             publishedDateContainer.appendChild(publishedDateText);
    //             publishedDateContainer.appendChild(publishedDateElement);

    //             // Append elements to the blog post container
    //             blogPostElement.appendChild(titleElement);
    //             blogPostElement.appendChild(descriptionElement);
    //             blogPostElement.appendChild(publishedDateContainer);
                

    //             return blogPostElement;
    //         }

    //         data.forEach(post => {
    //             const blogPostElement = createBlogPostElement(post);
    //             blogPostsContainer.appendChild(blogPostElement);
    //         });
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }
    
    // // Call the async function
    // fetchData();
    

    document.addEventListener("DOMContentLoaded", function () {
        // const searchInput = document.getElementById("searchInput");
        const blogPostsContainer = document.getElementById("blog-posts");
    
        // Function to create and append a blog post element
        function createBlogPostElement(post) {
            const blogPostElement = document.createElement("div");
            blogPostElement.classList.add("blog-post");

            //-----------------------------------------------------------------

            const timestamp = new Date(post.published_date);
            // Extracting date components
            const year = timestamp.getFullYear();
            const month = (timestamp.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const day = timestamp.getDate().toString().padStart(2, '0');

            // Format date as "YYYY-MM-DD"
            const formattedDate = `${year}-${month}-${day}`;

            //--------------------------------------------------------------------

            blogPostElement.setAttribute("data-post-id", post.id);

            // Populate data
            blogPostElement.innerHTML = `

                <h2 class= "limited-lines-title">${post.title}</h2>
                <p class= "limited-lines">${post.description}</p>
                <p align="right"><b>Published Date : ${formattedDate}</b></p>
            `;


            return blogPostElement;
        }
    
        // Function to update blog posts based on API response
        function updateBlogPosts(apiResponse) {
            // Remove existing blog posts
            blogPostsContainer.innerHTML = "";
    
            // Create and append new blog posts
            apiResponse.forEach(post => {
                const blogPostElement = createBlogPostElement(post);
                blogPostsContainer.appendChild(blogPostElement);
            });

        }

        // Function to handle click events on blog post titles
        function handleTitleClick(post) {
            console.log('Title clicked for post ID:', post.id);
            // Add logic to navigate to the details page, if needed
            // window.location.href = `/details/${post.id}`;
        }

        async function fetchData() {
            try {
                const response = await fetch('/blog/get/', {
                    method: 'GET',
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data);
                // updateBlogPosts(data);

                // Create and append new blog posts
                blogPostsContainer.innerHTML = "";
                data.forEach(post => {
                    const blogPostElement = createBlogPostElement(post);
                    blogPostsContainer.appendChild(blogPostElement);
                });

                // data.forEach(blogPost => {
                //     const titleElement = blogPostElement.querySelector(blogPost.title);
                //     titleElement.addEventListener("click", function () {
                //     // Call the function to handle the click event
                //     handleTitleClick(post);
                // });

                //     console.log(blogPost.id);
                // });

                // Add click event listener to the blog title
                

              
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Call the fetchData function
        fetchData();


        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();
    
            // Loop through each blog post and hide/show based on the search term
            const blogPosts = blogPostsContainer.getElementsByClassName("blog-post");
            for (const blogPost of blogPosts) {
                const title = blogPost.querySelector("h2").textContent.toLowerCase();
                const shouldShow = title.includes(searchTerm);
                blogPost.style.display = shouldShow ? "block" : "none";
            }
        });


        // const blogPostElements = document.querySelectorAll('.blog-post');

        // // Add click event listener to each title
        // blogPostElements.forEach(post => {
        //     const titleElement = post.querySelector('.blog-title');

        //     titleElement.addEventListener('click', function () {
        //         // Extract post ID from data attribute or other method
        //         const postId = post.getAttribute('data-id');

        //         // Redirect to the detailed view page
        //         window.location.href = `/blog/detail/${postId}`;
        //     });
        // });



    //     const blogTitleLinks = document.querySelectorAll('.blog-title-link');

    //     blogTitleLinks.forEach(link => {
    //     link.addEventListener('click', function (event) {
    //         // Prevent the default behavior (following the link) for demonstration purposes
    //         event.preventDefault();

    //         // Get the post ID from the data-id attribute
    //         const postId = link.closest('.blog-post').getAttribute('data-id');

    //         // Log the post ID to the console or perform any other action
    //         console.log('Title clicked for post ID:', postId);

    //         // Optionally, redirect to the detailed view page
    //         // window.location.href = `/blog/detail/${postId}`;
    //     });
        
        
    // });
        

        // const blogTitleLinks = document.querySelectorAll('post.title');

        // blogTitleLinks.forEach(link => {
        //     link.addEventListener('click', function (event) {
        //         // Prevent the default behavior (following the link) for demonstration purposes
        //         event.preventDefault();

        //         // Get the post ID from the data-id attribute
        //         const postId = link.closest('.blog-post').getAttribute('blog-post.id');

        //         // Log the post ID to the console or perform any other action
        //         console.log('Title clicked for post ID:', postId);

        //         // Optionally, redirect to the detailed view page
        //         // window.location.href = `/blog/detail/${postId}`;
        //     });
        // });
        



            























    // fetch('/blog/homepage/', {
    //     method: 'GET',
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         // Process the data and generate HTML
    //         const blogPostsContainer = document.getElementById('blog-posts');
    //         data.forEach(post => {
    //             const blogPostElement = createBlogPostElement(post);
    //             blogPostsContainer.appendChild(blogPostElement);
    //         });
    //     })
    //     .catch(error => console.error('Error fetching data:', error));












    // fetch('/blog/homepage/', {
    //     method: 'GET',
    // })
    //     .then(response =>{
    //         console.log('Raw response:', response);
    //         return response.json();
    //     })
    // //     .then(data => {
    
    // //         console.log(data);
    // //         console.log(typeof data);

    // //         // Process the data and generate HTML
    // //         const blogPostsContainer = document.getElementById('blog-posts');
    
    // //         // Function to create a blog post element
    // //         function createBlogPostElement(post) {
    // //             const blogPostElement = document.createElement('div');
    // //             blogPostElement.className = 'blog-post';

    // //             const titleElement = document.createElement('h2');
    // //             titleElement.textContent = post.title;

    // //             const descriptionElement = document.createElement('p');
    // //             descriptionElement.textContent = post.description;

    // //             const publishedDateElement = document.createElement('p');
    // //             publishedDateElement.textContent = post.publishedDate;
    // //             publishedDateElement.setAttribute('align', 'right');

    // //             // Append elements to the blog post container
    // //             blogPostElement.appendChild(titleElement);
    // //             blogPostElement.appendChild(descriptionElement);
    // //             blogPostElement.appendChild(publishedDateElement);

    // //             return blogPostElement;
    // //         }

    // //         // Append each blog post to the main container
    // //     data.forEach(post => {
    // //         const blogPostElement = createBlogPostElement(post);
    // //         blogPostsContainer.appendChild(blogPostElement);
    // //     });
    // // })
    // .catch(error => console.error('Error fetching data:', error));


});
