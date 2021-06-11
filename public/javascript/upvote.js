// upvote button click handler
async function upvoteClickHandler(event) {
    event.preventDefault();

    // split post url into array based on '/' and select last item in array
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // use id variable in fetch() and check status of req
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // check status of request
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".upvote-btn").addEventListener('click', upvoteClickHandler);