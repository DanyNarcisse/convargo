'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];


function EuroVolume()
{
    var priceTab = [];
    var index = 0;
    for(var i=0;i < deliveries.length; i++ )
        {
            for(var j =0; j< truckers.length; j++)
                {
                    if(deliveries[i].truckerId == truckers[j].id)
                        {
                            var Price = deliveries[i].distance * truckers[j].pricePerKm + deliveries[i].volume * truckers[j].pricePerVolume;
                            
                            var priceTemp;
                            
                            if(deliveries[i].volume > 5 && deliveries[i].volume <= 10)
                                {
                                    priceTemp = Price - (Price * 0.1);
                                }
                            
                            else if(deliveries[i].volume > 10 && deliveries[i].volume <=25)
                                {
                                    priceTemp = Price - (Price * 0.3);
                                }
                            
                            else if(deliveries[i].volume > 25)
                                {
                                    priceTemp = Price - (Price * 0.5);
                                }
                            else priceTemp = Price;
                            priceTab[index] = priceTemp;
                            index ++;
                        }
                }
        }
    return priceTab;
}

function printTab(tableau)
{
    for(var i = 0; i<tableau.length; i++)
        {
            console.log(tableau[i]);
        }
}

//Function for insruance company's money
function insuranceMoney(euroVolumeTab)
{
    var insuranceMoneyTab = [];
    var euroVolumeTab = EuroVolume();
    for(var i=0;i < deliveries.length; i++ )
        {
            insuranceMoneyTab[i] = (euroVolumeTab[i] * 0.3) * 0.5;
        }
    return insuranceMoneyTab;
}

//Function the treasury's money
function treasuryMoney(euroVolumeTab)
{
    var treasuryTab = [];
    var euroVolumeTab = EuroVolume();
    for(var i=0;i < deliveries.length; i++ )
        {
            if(deliveries[i].distance > 500)
                {
                    treasuryTab[i] = deliveries[i].distance/500
                }
            else treasuryTab[i] = 0;
        }
    return treasuryTab;
}

//Function convargo's money
function convargoMoney(euroVolumeTab)
{
    var convargoTab = [];
    var euroVolumeTab = EuroVolume();
    var insuranceTab = insuranceMoney(EuroVolume());
    var treasuryTab = treasuryMoney(EuroVolume());
    
    for(var i=0;i < euroVolumeTab.length; i++ )
        {
            convargoTab[i] = (euroVolumeTab[i]* 0.3) - (treasuryTab[i] + insuranceTab[i]);
        }
    return convargoTab;
}

//Function deductible
function deductible()
{
    var deductibleTab = [];
    for (var i =0; i< deliveries.length; i++)
        {
            deductibleTab[i] = 1000;
            if(deliveries[i].options.deductibleReduction == true)
                {
                    deductibleTab[i] = 200 + deliveries[i].volume;
                }
        }
    return deductibleTab;
}

//Function shipperDebit
function shipperDebit()
{
    var euroVolumeTab = EuroVolume();
    var deductibleTab = deductible();
    var shipperDebitTab = [];
    for(var i = 0; i<euroVolumeTab.length; i++)
        {
            shipperDebitTab[i] = euroVolumeTab[i] + deductibleTab[i];
        }
    return shipperDebitTab;
}

//Function trucker's Debit
function truckersCredit()
{
    var euroVolumeTab = EuroVolume()
    var truckersDebitTab = [];
    
    for (var i = 0; i < deliveries.length; i++)
        {
            truckersDebitTab[i] = euroVolumeTab[i] * 0.7;
        }
    return truckersDebitTab;
}

//Function convargo's credit
function convargoCredit()
{
    var convargoMoneyTab = convargoMoney();
    var deductibleTab = deductible();
    var convargoCreditTab = [];
    
    for(var i = 0; i < deliveries.length; i++)
        {
            convargoCreditTab[i] = convargoMoneyTab[i] + deductibleTab[i];
        }
    return convargoCreditTab;
}

console.log(truckers);
console.log(deliveries);
console.log(actors);

//--------------------- STEP 1 & 2 ------------------------

console.log("EuroVolume then EuroVolume with decreased prices:");
printTab(EuroVolume());

//--------------------- STEP 3 ------------------------

console.log("Comissions: insurance, treasury, convargo:");
printTab(insuranceMoney());
printTab(treasuryMoney());
printTab(convargoMoney());

//--------------------- STEP 4 ------------------------

console.log("Price of deductibles:");
printTab(deductible());

//--------------------- STEP 5 ------------------------
console.log("Shipper debit:");
printTab(shipperDebit());

console.log("Trucker's debit:");
printTab(truckersCredit());

console.log("Insurance comission:");
printTab(insuranceMoney());

console.log("Treasury comission:");
printTab(treasuryMoney());

console.log("Convargo comission");
printTab(convargoCredit());