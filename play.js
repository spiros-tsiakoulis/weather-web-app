const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            lat: 433,
            lon: 343
        };
        callback(data);
    }, 3000)
}

geocode('Athens', (data) => {
    console.log(data);
})