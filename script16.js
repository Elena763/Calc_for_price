let model = document.getElementById("model");
const button = document.querySelector(".button");
let totalPrice;
//Функция подстановки модели в зависимости от марки
function checkModel() {
let marka = document.getElementById("marka").value;
    if (marka === 'Audi') {
        model.options.length = 0;
        for (let AudiModel of AudiModels) {
        let i = AudiModel;
        let newModel = document.createElement('option');
        newModel.innerHTML = `<option value="${i}" id="model `+` ${i}">
        ${i} </option>`;
        model.appendChild(newModel);
        };
    } else {
        if (marka === 'BMW') {
            model.options.length = 0;
            for (let BMWModel of BMWModels) {
                let a = BMWModel;
                let newModel = document.createElement('option');
                newModel.innerHTML = `<option value="${a}" id="model `+` ${a}">
                ${a} </option>`;
                model.appendChild(newModel);
                };
        } else {
            if (marka === 'Mazda') {
                model.options.length = 0;
                for (let MazdaModel of MazdaModels) {
                    let b = MazdaModel;
                    let newModel = document.createElement('option');
                    newModel.innerHTML = `<option value="${b}" id="model `+` ${b}">
                    ${b} </option>`;
                    model.appendChild(newModel);
                    };
            } else {
                if (marka === 'Mercedes') {
                    model.options.length = 0;
                    for (let MercedesModel of MercedesModels) {
                        let c = MercedesModel;
                        let newModel = document.createElement('option');
                        newModel.innerHTML = `<option value="${c}" id="model `+` ${c}">
                        ${c} </option>`;
                        model.appendChild(newModel);
                        };
                } else {
                    alert('Выберите марку');
                }
            }
        }
    }
};
//Функция определения цены из массива по модели авто
let carPrice;
function checkPrice() {
    let marka = document.getElementById("marka").value;
    if (marka === 'Audi') {
        modelAudi = document.getElementById("model").value;
        for (let audiprice of AudiPrices) {
            if (modelAudi === audiprice.name) {
                carPrice = audiprice.price;
            }
        };
    } else {
        if (marka === 'BMW') {
            modelBMW = document.getElementById("model").value;
            for (let bmwprice of BMWPrices) {
                if (modelBMW === bmwprice.name) {
                    carPrice = bmwprice.price;
                }
            };
        } else {
            if (marka === 'Mazda') {
                modelMazda = document.getElementById("model").value;
                for (let mazdaprice of MazdaPrices) {
                    if (modelMazda === mazdaprice.name) {
                        carPrice = mazdaprice.price;
                    }
                };
            } else {
                if (marka === 'Mercedes') {
                    modelMercedes = document.getElementById("model").value;
                    for (let mercedesprice of MercedesPrices) {
                        if (modelMercedes === mercedesprice.name) {
                            carPrice = mercedesprice.price;
                        }
                    };
                } else {
                    alert('Выберите модель');
                }
            }
        }
    }
    return carPrice;
};
//Функция подсчета цены, в зависимости от выбранных параметров
function calculatePrice() {
    //Определение коэффициента, применяемого к цене, в зависимости от года выпуска
    let year = document.getElementById("year").value;
    let kYear = 1 - ((2023 - year) * 0.05);

    //Определение коэффициента, применяемого к цене, в зависимости от типа коробки передач
    let transmissions = document.getElementById("transmission").value;
    let kTM;
    if (transmissions == 'AT') {
        kTM = 1;
    } else {
        if (transmissions == 'MT') {
            kTM = 0.8;
        } else {
            kTM = 0.9;
        }
    }

    //Определение коэффициента, применяемого к цене, в зависимости от объема двигателя
    let volume = document.getElementById("volume").value;
    //console.log(volume);
    let kVolume = 1;
    if (volume <= 1.6) {
        kVolume = 0.8;
    } else {
        if (volume <= 2) {
            kVolume = 1;
        } else {
            if (volume <= 2.5 ) {
                kVolume = 1.1;
            } else {
                if (volume <= 3) {
                    kVolume = 1.2;
                } else {
                    kVolume = 1.25;
                }
            }
        }
    }

    //Определение коэффициента, применяемого к цене, в зависимости от типа топлива
    let fuels = document.querySelectorAll('input[name="fuel"]');
    for (const f of fuels) {
        if (f.checked) {
        fu = f.value;
        }
    }
    let kFuel;
    if (fu === 'petrol') {
        kFuel = 0.9;
    } else {
        kFuel = 1;
    }

    //Определение коэффициента, применяемого к цене, в зависимости от количества владельцев по ПТС

    //Определение старого авто для запуска функции отображения скрытого блока
    let conditions = document.querySelectorAll('input[name="pts"]');
    let cond;
    let kPTS;
    for (const c of conditions) {
        if (c.checked) {
            cond = c.value;
            vewDiv(cond);
        }
    };
    //Определение коэффициента
    let owners = document.querySelectorAll('input[name="owner"]');
    let PTS;
    for (const owner of owners) {
        if (owner.checked) {
            PTS = owner.value
        }
    };
    if (cond === 'new') {
        kPTS = 1;
    } else {
        if (PTS === 'one'){
            kPTS = 0.98;
        } else {
            if (PTS === 'two') {
                kPTS = 0.96;
            } else {
                if (PTS === 'three') {
                    kPTS = 0.94;
                } else {
                    kPTS = 0.92;
                }
            }
        }
    }

    //Определение коэффициента, применяемого к цене, в зависимости от типа оплаты
    let payments = document.querySelectorAll('input[name="pay"]');
    for (const payment of payments) {
        if (payment.checked) {
        p = payment.value;
        }
    };
    let kPay = 1;
    if (p === "bill") {
        kPay = 1.03;
    } else {
        if (p === "card") {
            kPay = 1.01;
        } else {
            kPay = 1;
        }
    }

    //Определение конечной цены автомобиля
    console.log(carPrice, kYear, kTM, kVolume, kFuel, kPTS, kPay);
    totalPrice = carPrice * kYear * kTM * kVolume * kFuel * kPTS * kPay;
    console.log(totalPrice);
};
console.log(totalPrice);
//Функция вывода результата
function addTotalPrice() {
     //Создание блока
    let form = document.getElementById("form");
    document.getElementById("totaltext").style.display = 'block';
    document.getElementById("totalprice").style.display = 'block';
    let p = document.getElementById("totalprice");
    p.textContent = `${totalPrice} рублей`;
    form.reset();
}
button.addEventListener("click", addTotalPrice);

//Функция видимости блока с выбором количества собственников
function vewDiv(cond) {
    if (cond === 'old'){
        document.getElementById("p_owner").style.display = 'block';
        document.getElementById("div_owner").style.display = 'grid';
     } else{
        document.getElementById("p_owner").style.display = 'none';
        document.getElementById("div_owner").style.display = 'none';
     }
};
