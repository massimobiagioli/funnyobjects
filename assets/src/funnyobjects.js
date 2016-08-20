let funnyobjects = {
    baseUrl: '/funnyobjs/index.php/api',
    path: '/funnyobject',
    headers: {
        'X-CI-APIKEY': 'HelloWorld123!'
    },
    load: (rowId, onSuccess) => {
        $.ajax({
            url: funnyobjects.baseUrl + funnyobjects.path + '/' + rowId,
            headers: funnyobjects.headers,
            success: onSuccess
        });
    }
}

export default funnyobjects