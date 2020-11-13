public with sharing class API_Call {

    public API_Call() {

    }

    @AuraEnabled(cacheable=true)
    public static String getCurrencies () {

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.ratesapi.io/api/latest');
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {

            return response.getBody();

        } else return 'Empty';
    }

    @AuraEnabled(cacheable=true)
    public static String hello () {

        return 'Hello!';
    }
}