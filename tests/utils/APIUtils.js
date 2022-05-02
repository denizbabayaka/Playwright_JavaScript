class APIUtils {
     
    constructor(apiContext,loginPayLoad) //here apiContext belongs the class constructor parameter
    
    {
        //with the heip of this we are making apiContext a property of the class so 
        // it can be used any method inside the class 
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
    }
    
     
    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad

            }) 
       
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;


    }
    
    async createOrder(orderPayLoad) {

        let response ={};
        response.token=await this.getToken();
         //This will open a new APi context
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayLoad,
        //we are sending header inside token and payload as json
        headers: {
            'Authorization': response.token, //calling token  from the getToken method
            'Content-Type': 'application/json'
        },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const  orderId = orderResponseJson.orders[0];
    response.orderId=orderId;
    return response;


    }



}

// now this class globallly available to all the project
module.exports = {APIUtils};