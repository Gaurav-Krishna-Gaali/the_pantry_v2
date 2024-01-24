export default {
    template: `
    <form class=" d-flex w-100" action="/search" method="POST">
    <input class="form-control me-sm-2" type="text" name="query"
        placeholder="Search for products or categories">
    <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
</form>`
}