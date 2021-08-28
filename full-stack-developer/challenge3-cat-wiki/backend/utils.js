exports.generateUrlWithParams = function(url, req) {
    let apiUrl = new URL(url);
    if (req.params.id) apiUrl.searchParams.append('breed_id', req.params.id);
    if (req.params.name) apiUrl.searchParams.append('q', req.params.name);
    if (req.query.limit) apiUrl.searchParams.append('limit', req.query.limit);
    if (req.query.page) apiUrl.searchParams.append('page', req.query.page);
    return apiUrl.toString();
}