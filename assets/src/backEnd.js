let backEnd = {
    baseUrl: '/funnyobjs/index.php/api',
    headers: {
        'X-CI-APIKEY': 'HelloWorld123!'
    },
    load: (modelName, rowId, onSuccess, onError) => {
        $.ajax({
            url: backEnd.baseUrl + '/' + modelName + '/' + rowId,
            headers: backEnd.headers,
            success: onSuccess,
            error: onError
        });
    },
    insert: (modelName, data, onSuccess, onError) => {
        $.ajax({
            method: 'POST',
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: backEnd.baseUrl + '/' + modelName,
            data: JSON.stringify(data),
            headers: backEnd.headers,
            success: onSuccess,
            error: onError
        });
    },
    update: (modelName, rowId, data, onSuccess, onError) => {
        $.ajax({
            method: 'PUT',
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: backEnd.baseUrl + '/' + modelName + '/' + rowId,
            data: JSON.stringify(data),
            headers: backEnd.headers,
            success: onSuccess,
            error: onError
        });
    },
    del: (modelName, rowId, onSuccess, onError) => {
        $.ajax({
            method: 'DELETE',
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: backEnd.baseUrl + '/' + modelName + '/' + rowId,
            headers: backEnd.headers,
            success: onSuccess,
            error: onError
        });
    }
}

export default backEnd