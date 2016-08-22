let backEnd = {
    baseUrl: '/funnyobjs/index.php/api',
    headers: {
        'X-CI-APIKEY': 'HelloWorld123!'
    },
    load: (modelName, rowId, onSuccess) => {
        $.ajax({
            url: backEnd.baseUrl + '/' + modelName + '/' + rowId,
            headers: backEnd.headers,
            success: onSuccess
        });
    },
    insert: (modelName, data, onSuccess) => {
        $.ajax({
            method: 'POST',
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: backEnd.baseUrl + '/' + modelName,
            data: JSON.stringify(data),
            headers: backEnd.headers,
            success: onSuccess
        });
    }
}

export default backEnd