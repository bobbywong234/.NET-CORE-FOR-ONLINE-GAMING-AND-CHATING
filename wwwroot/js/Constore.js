//use parseint javascript can parse any integer in one var and combine all int together

function onloadpagedata() {
    var products = ["USB线", "包子", "充电宝", "蛋糕", "豆奶", "饭团", "关东煮", "果汁", "红烧牛肉面", "花生米",
        "鸡仔饼", "咖啡", "咖喱鱼丸", "烤香肠", "可乐", "绿茶", "美味棒", "面包", "奶茶", "奶昔",
        "能量饮料", "牛奶", "糯米糍", "啤酒", "巧克力", "薯片", "酸奶", "甜甜圈", "威化饼", "仙贝",
        "香烟", "杏仁", "雪糕", "雨伞", "杂志", "纸巾"] //size 36 items 

    /*for (var i = 1; i < 10; i++) {
        var random_demand = Math.floor(Math.random() * 36);
        document.getElementById("need" + i.toString()).value = random_demand];
    }*/

    var customer_table = '';
    customer_table += '<tr><th class="customercell" style="background-color:gray;" colspan="4">顾客需求（当天）</th></tr>';
    customer_table += '<tr>' +
        '<th class="customercell" style="background-color:transparent"></th>' +
        '<th class="customercell" style="background-color:gray">A团</th>' +
        '<th class="customercell" style="background-color:gray">B团</th>' +
        '<th class="customercell" style="background-color:gray">C团</th>' +
        '</tr>';
    for (var i = 0; i <= 2; i++) {
        customer_table += '<tr><th class="customercell" style="background-color:aqua">顾客' + (i + 1).toString() + '</th>';
        for (var x = 1; x <= 3; x++) {
            customer_table += '<th class="customercell">' +
                '<input id="need' + (3 * i + x).toString() + '" type="text" class="customerinput" name="need' + (3 * i + x).toString() + '" value="' + products[Math.floor(Math.random() * 36)]+'" onkeydown="return false"' +
                'onclick="getsold(this.id)" style="cursor:pointer" onload="customerneeds(this.id)" />' +
                '</th>';
        }
        customer_table += '</tr>';
    }
    $("#customer").append(customer_table);


    var personal_icon_path = "";
    $.ajax(
        {
            type: "post",
            url: "/Home/Gaming_data_loader",
            timeout: 20000,
            dataType: "json",
            data: {},
            success: function (data)
            {
                var Capital_element = '<tr>' +
                    '<th> 当日收入:</th>' +
                    '<th>' +
                    '<input name="Revenue" id="Revenue" value="0" class="capitalinfo" />' +
                    '</th>' + '<th style="width:10px"></th>'+'<th>总资金：</th>' +
                    '<th>' +
                    '<input name="Capital" id="Capital" value="' + data.capital + '" class="capitalinfo" />' +
                    '</th>' +
                    '</tr>';
                    
                $("#Capital_table").append(Capital_element);

                //2 tables of stock record
                var instock_table = //'<table id="instock" class="instocktable">'+
                        '<tr><th class="instocktitle" colspan="4">定价单</th></tr>' +
                        '<tr>'+
                        '<th class="instocktitle">存货分类</th>'+       
                        '<th class="instocktitle">零售价</th>' +
                        '<th class="instocktitle">存货分类</th>' +
                        '<th class="instocktitle">零售价</th>' +
                        '</tr>';
                    for (var n = 0; n < 6; n++) {
                        instock_table += '<tr>';
                        for (var i = 0; i < 2; i++) {
                            instock_table += '<th class="instockcells" id="Record' + ((2 * n + 1) + i).toString() + '">' + data.products[(2 * n) + i] + '</th>' +
                                '<th class="instockcells">' +
                                '<text onclick=decreasvalues("price' + ((2 * n + 1) + i).toString() + '","Record' + ((2 * n + 1) + i).toString() + '") style="cursor:pointer">-</text>' +
                                '<input name="price' + ((2 * n + 1) + i).toString() + '" id="price' + ((2 * n + 1) + i).toString() + '" class="pricinginput" value="' + data.products[(12 + (2 * n) + i)] + '" maxlength="2" onkeydown="return false" />' +
                                '<text onclick=increasvalues("price' + ((2 * n + 1) + i).toString() + '","Record' + ((2 * n + 1) + i).toString() + '") style="cursor:pointer">+</text>' +
                                '</th>';
                        }
                        instock_table += '</tr>';
                    }
                    //instock_table +='</table>';
                $("#instock").append(instock_table);

                //4 tables of shelves
               var shelf_element = '';
                for (var i = 1; i <= 4; i++)
                {
                    shelf_element += '<table id="shelf_' + i.toString() + '" class="Shelf' + i.toString() + '">' +
                            '<tr><th class="shelftitle" colspan="2">货架#' + i.toString() + '</th></tr>' +
                            '<tr>' +
                            '<th class="shelftitle">商品名称</th>' +
                            '<th class="shelftitle">商品数量</th>' +
                            '</tr>';
                    for (var n = 1; n <= 3; n++)
                    {
                            shelf_element += '<tr>' +
                                '<th class="shelfCat">' +
                                '<input class="instockinput" id="goodsname' + (n + (i - 1) * 3).toString() + '" name="Name' + (n + (i - 1) * 3).toString() + '" value="' + data.products[(i - 1) * 3 + (n - 1)] + '" onkeydown = "return false" />' +
                                '</th>'+
                                '<th class="shelfCat">'+
                                '<input id="num' + (n + (i - 1) * 3).toString() + '" name="number' + (n + (i - 1) * 3).toString() + '" class="pricinginput" value="' + data.products[((i - 1) * 3 + (n - 1)) + 24] + '" maxlength="2" onkeydown="return false" />&nbsp;&nbsp;' +
                                '</th>'+
                                '</tr>';
                            
                    }
                    shelf_element += '</table>';
                }
                $("#inshelf").append(shelf_element);

                //2 tables of supplies info
                $("#Supply_market").append(
                    '<tr>'+
                    '<th style="height:20px;font-size:15px;font-style:normal;background-color:gray; width:auto;border:1px solid black" colspan="4">采购清单#1</th>' +
                    '</tr>'+
                    '<tr>' +
                    '<th style="height:20px;font-size:15px;font-style:normal;background-color:gray; width:auto;border:1px solid black">货源种类</th>' +
                    '<th style="height:20px;font-size:15px;font-style:normal;background-color:gray; width:auto;border:1px solid black">可入货数量</th>' +
                    '<th style="height:20px;font-size:15px;font-style:normal;background-color:gray; width:auto;border:1px solid black">批发价</th>' +
                    '<th style="height:20px;font-size:15px;font-style:normal;background-color:gray; width:auto;border:1px solid black">买入货架</th>' +
                    '</tr>');
                var supplies_table = '';
                for (var i = 1; i <= 12; i++) {
                        supplies_table +='<tr>' +
                        '<th id="product' + i.toString() + '" class="supplycellformate">' + data.supplies_item_nameandprices[i - 1] + '</th>' +
                        '<th id = "supply' + i.toString() + '" class="supplycellformate" >' + data.supplies_item_replienish_number[i - 1] + '</th>' +
                        '<th id="productprice' + i.toString() + '" class="supplycellformate">' + data.supplies_item_nameandprices[11+i]+'</th>'+
                            '<th class="supplycellformate">' +
                            '<select id="selection' + i.toString() + '">' +
                        "<option onclick=clearupshelf('product" + i.toString() + "')></option>";
                    for (var n = 1; n <= 12; n++) {
                        supplies_table += "<option onclick=buyin('product" + i.toString() + "','goodsname" + n.toString() + "','num" + n.toString() + "'," + i + ",this) >商品栏#" + n.toString() + "</option>";
                    }

                    supplies_table += '</select>';
                    supplies_table += '</th>';
                    supplies_table += '<th><button id="plusbutton' + i.toString() + '" class="supply_button_plus" style="display:none" onclick=stockin("selection' + i.toString() + '")></button></th>';
                    supplies_table += '<th><button id="minusbutton' + i.toString() + '" class="supply_button_minus" style="display:none" onclick=canclebuy("selection' + i.toString() + '")></button></th>';
                    supplies_table += '</tr>';
                }
                $("#Supply_market").append(supplies_table);

                $('#icon_view').attr('src', data.icon_path)
                personal_icon_path = data.icon_path;

                document.getElementById('round_number').innerHTML = "店长合同期限：" + data.record + " / 500";
            },
            error: function (data) {}
        }
    )
    var connection = new signalR.HubConnectionBuilder().withUrl("/Chatbox").build();

    connection.on("ReceiveMessage", function (username, message,icon) {
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        $('#chatbox').append('<p class="Received_para"><img src="' + icon + '" class="personal_icon_chat" />&nbsp&nbsp' + username.toString() + '</p><p class="Received_para"><textarea class="Received_msg">' + msg.toString() + '</textarea></p>');
    });

    connection.start()(function () {
        
    }).catch(function (err) {
        return console.error(err.toString());
    });

  
    key = document.getElementById("chatinput");
    key.addEventListener("keydown", function (event) {
        if (key.value != '') {
            if (event.keyCode == 13 && event.ctrlKey) {
                var username = document.getElementById("user_name").innerHTML;
                var message = document.getElementById("chatinput").value;
                var icon = personal_icon_path;

                $('#chatbox').append('<p class="chatpara"><img src="' + personal_icon_path + '" class="personal_icon_chat" /></p><p class="chatpara"><textarea class="chat" autofocus>' + key.value + '</textarea></p>');
                document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
                connection.invoke("Message_async_sender", username, message, icon).catch(function (err) {
                    return console.error(err.toString());
                });
                connection.start()(function () {

                }).catch(function (err) {
                    return console.error(err.toString());
                });
                key.value = '';
                return;
            }
        }
    })

    send_button = document.getElementById("send_button");
    send_button.addEventListener("click", function (event) {
        var username = document.getElementById("user_name").innerHTML;
        var message = document.getElementById("chatinput").value;
        var icon = personal_icon_path;
        $('#chatbox').append('<p class="chatpara"><img src="' + personal_icon_path + '" class="personal_icon_chat" /></p><p class="chatpara"><textarea class="chat">' + key.value + '</textarea></p>')
        document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
        connection.invoke("Message_async_sender", username, message, icon).catch(function (err) {
            return console.error(err.toString());
        });
        connection.start()(function () {

        }).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
        key.value = '';
        return;
    })
}


//may use with websocket
function go_to_nextday() {
    var counter = parseInt(document.getElementById('days_count').value, 10);
    counter += 1;
    document.getElementById('days_count').value = counter;
    document.getElementById('round_number').innerHTML = "店长合同期限：" + counter.toString() + "/500";

    var current_capital = document.getElementById('Capital').value;
    var current_prices = "";
    var current_num = "";
    var current_record = document.getElementById('days_count').value;
    var current_goodsname = "";
    var current_user = document.getElementById('user_name').innerHTML;

    for (var i = 1; i <= 12; i++) {
        if (document.getElementById('price' + i).value == "") {
            if (i == 12) { current_prices += ""; }
            else { current_prices += ","; }
        }
        else {
            if (i == 12) { current_prices += document.getElementById('price' + i).value; }
            else { current_prices += document.getElementById('price' + i).value + ","; }
        }

        if (document.getElementById('num' + i).value == "") {
            if (i == 12) { current_num += ""; }
            else { current_num += ","; }
        }
        else {
            if (i == 12) { current_num += document.getElementById('num' + i).value; }
            else { current_num += document.getElementById('num' + i).value + ","; }
        }

        if (document.getElementById('goodsname' + i).value == "")
        {
            if (i == 12) { current_goodsname += ""; }
            else { current_goodsname += ","; }
        }
        else
        {
            if (i == 12) { current_goodsname += document.getElementById('goodsname' + i).value; }
            else { current_goodsname += document.getElementById('goodsname' + i).value + ","; }
        }
    }

    $.ajax({
        type: "post",
        url: "/Home/Gaming_cookie",
        timeout: 20000,
        dataType: "json",
        data: {
            capital:current_capital,
            prices:current_prices,
            number:current_num,
            record:current_record,
            goodsname: current_goodsname,
            user: current_user
        },
        success: function (data, response) {
            if (response != null) {
                alert(data.success_or_fail);
            }
            else { alert(data.success_or_fail); }
        },
        error: function (response) { alert("服务器无响应") }
    })
}

function show_table(this_table) {
    var tables_line = ['Supply_market', 'customer', 'instock', 'shelf_1', 'shelf_2', 'shelf_3', 'shelf_4'];

    for (var i = 0; i < tables_line.length; i++) {
        document.getElementById(tables_line[i]).style.display = 'none';
        if (tables_line[i] == this_table) {
            document.getElementById(this_table).style.display = "";
        }
        if (this_table == 'shelf_1') {
            document.getElementById('shelf_1').style.display = "";
            document.getElementById('shelf_2').style.display = "";
            document.getElementById('shelf_3').style.display = "";
            document.getElementById('shelf_4').style.display = "";
        }
        if (this_table == 'customer') {
            document.getElementById('customer').style.top = '10%';
        }
        if (this_table == 'instock') {
            document.getElementById('customer').style.top = '8%';
        }
    }
}

function pressbutton(elementid) {
    var gamingobject = document.getElementById(elementid);
    gamingobject.style.backgroundSize = "95% 95%";
}

function backtodefaultstyle(elementid) {
    var gamingobject = document.getElementById(elementid);
    gamingobject.style.backgroundSize = "100% 100%";

}

function bluegrowingtext(elementid) {
    var gamingobject = document.getElementById(elementid);
    gamingobject.style.textShadow = "1px 1px 2px blue, 0 0 0.3em blue";
}

function bluetext(elementid) {
    var gamingobject = document.getElementById(elementid);
    gamingobject.style.textShadow = "1px 1px 2px blue";
}

function reloadpage() {
    window.location.reload(true);
}

function increasvalues(elementid, titleid) {
    if (document.getElementById(titleid).innerHTML != "" &&
        document.getElementById(elementid).value !="") { 
        var value = parseInt(document.getElementById(elementid).value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById(elementid).value = value;
    }

    var i;
    var t;
    var record = document.getElementById(titleid);
    if (document.getElementById(elementid).value == "") {
        for (i = 1; i < 13; i++) {
            if (document.getElementById("goodsname" + i.toString()).value == record.innerText) {
                for (t = 1; t < 13; t++) {
                    if (document.getElementById("product" + t.toString()).innerText == record.innerText) {
                        var value2 = parseInt(document.getElementById("productprice" + t.toString()).innerHTML, 10);
                        value2++;
                        document.getElementById(elementid).value = value2;
                        break;
                    }
                    else if (t==12){
                        var value3 = Math.floor(Math.random() * 5) + 3;
                        value3++;
                        document.getElementById(elementid).value = value3;
                    }
                }
            }
        }
    }
}

function decreasvalues(elementid, titleid) {
    if (document.getElementById(titleid).innerHTML == "") { }
    else {
        var value = parseInt(document.getElementById(elementid).value, 10);
        value = isNaN(value) ? 0 : value;
        value--;
        document.getElementById(elementid).value = value;
    }
}

function buttoneffect() {
    document.body.style.fontSize = '20px';
}

function buyin(buyingoods, instock, instocknumber, button_serial_no,selection) {
    var changed = false;
    var record_previouse_goodsname;
    var record_previouse_goodsnum;
    var record_previouse_sellprice;
    var instockcat = document.getElementById(instock);
    var product = document.getElementById(buyingoods);
    var numberofinstock = document.getElementById(instocknumber);

    for (var i = 1; i < 13; i++) {
        if (document.getElementById("goodsname" + i.toString()).value == product.innerText) {
            changed = true;
            record_previouse_goodsname = document.getElementById("goodsname" + i.toString()).value;
            record_previouse_goodsnum = document.getElementById("num" + i.toString()).value;
            record_previouse_sellprice = document.getElementById("price" + i.toString()).value;
            document.getElementById("goodsname" + i.toString()).value = "";
            document.getElementById("num" + i.toString()).value = "";
            document.getElementById("Record" + i.toString()).value = "";
            document.getElementById("price" + i.toString()).value = "";
        }

        if (document.getElementById("selection" + i.toString()).selectedIndex == 0) {
            document.getElementById('plusbutton' + i.toString()).style.display = "none";
            document.getElementById('minusbutton' + i.toString()).style.display = "none";
        } 
    }
    document.getElementById('plusbutton' + button_serial_no.toString()).style.display = "";
    document.getElementById('minusbutton' + button_serial_no.toString()).style.display = "";

    if (instockcat.value != "") {
        var replacestock = confirm("确定要替换货品？");
        if (replacestock) {
            instockcat.value = product.innerText;
            numberofinstock.value = 0;
            for (var i = 1; i < 13; i++) {
                if (i != button_serial_no) {
                    $("#selection" + i.toString()).each(function () {
                        if (this.value == selection.value) { document.getElementById("selection" + i.toString()).selectedIndex = 0; }
                    })
                }
            }
        }
        else {
            instock.value = instock.value;
            numberofinstock.value = numberofinstock.value;
            document.getElementById('plusbutton' + button_serial_no.toString()).style.display = "none";
            document.getElementById('minusbutton' + button_serial_no.toString()).style.display = "none";
            document.getElementById('selection' + button_serial_no.toString()).selectedIndex = 0;
        }
    }
    else {
        instockcat.value = product.innerText;
        numberofinstock.value = 0;
        if (changed == true) {
            instockcat.value = record_previouse_goodsname;
            numberofinstock.value = record_previouse_goodsnum;

            for (var t = 1; t < 13; t++) {
                if (document.getElementById("Record" + i.toString())!= null) {
                    if (document.getElementById("Record" + i.toString()).innerHTML == instock.value) {
                        document.getElementById("price" + i.toString()).innerHTML = record_previouse_sellprice;
                    }
                }
            }
        }
    }
}

function stockin(selection) {
    var current_supplies_selection = document.getElementById(selection).selectedIndex;
    var stockproduct = document.getElementById('goodsname' + current_supplies_selection.toString());
    var stocknum = document.getElementById('num' + current_supplies_selection.toString());
    var number = current_supplies_selection;
    var i;

    for (i = 1; i < 13; i++) {
        var supplyproduct = document.getElementById("product" + i.toString());
        var supplynum = document.getElementById("supply" + i.toString());
        var supplyprice = document.getElementById("productprice" + i.toString());
        if (stockproduct.value == supplyproduct.innerText) {
            var value = parseInt(stocknum.value, 10);
            value++;
            stocknum.value = value;
            supplynum.innerHTML -= 1;

            var dedcutedamount = parseInt(document.getElementById("Capital").value, 10) -
                parseInt(document.getElementById("productprice" + i.toString()).innerHTML, 10)
            dedcutedamount = isNaN(dedcutedamount) ? 0 : dedcutedamount;
            document.getElementById("Capital").value = dedcutedamount;

            var initialvalue = supplyprice.innerHTML;
            if (stocknum.value == 1) {
                document.getElementById("Record" + number.toString()).innerHTML = stockproduct.value;
                document.getElementById("price" + number.toString()).value = parseInt(initialvalue, 10);
            }
            
        }
    }

}

function canclebuy(selection) {
    var current_supplies_selection = document.getElementById(selection).selectedIndex;
    var stockproduct = document.getElementById('goodsname' + current_supplies_selection.toString());
    var stocknum = document.getElementById('num' + current_supplies_selection.toString());
    var number = current_supplies_selection;
    var i;
    for (i = 1; i < 13; i++) {
        var supplyproduct = document.getElementById("product" + i.toString());
        var supplynum = document.getElementById("supply" + i.toString());
        if (stockproduct.value == supplyproduct.innerText) {
            var value = parseInt(stocknum.value, 10);
            var value2 = parseInt(supplynum.innerText, 10);
            value--;
            value2++;
            stocknum.value = value;
            supplynum.innerHTML = value2;

            var withdrawtrade = parseInt(document.getElementById("Capital").value, 10) +
                parseInt(document.getElementById("productprice" + i.toString()).innerHTML, 10)
            withdrawtrade = isNaN(withdrawtrade) ? 0 : withdrawtrade;
            document.getElementById("Capital").value = withdrawtrade;

            if (stocknum.value == 0) {
                stocknum.value = "";
                stockproduct.value = "";
                document.getElementById("Record" + number.toString()).innerHTML = "";
                document.getElementById("price" + number.toString()).value = "";
                document.getElementById(selection).selectedIndex = 0;
                document.getElementById("plusbutton" + i.toString()).style.display = "none";
                document.getElementById("minusbutton" + i.toString()).style.display = "none";
            }
        }
    }
}

function clearupshelf(productid) {
    var q;
    var productname = document.getElementById(productid);

    for (q = 1; q < 13; q++) {
        if (document.getElementById("goodsname" + q.toString()).value == productname.innerText) {
            document.getElementById("goodsname" + q.toString()).value = "";
            document.getElementById("num" + q.toString()).value = "";
        }
    }
}

function getsold(Solditem) {
    var item = document.getElementById(Solditem).value;
    var capital = document.getElementById('Revenue');
    var rand = Math.floor(Math.random() * 5) + 1;

    for (var x = 1; x < 13; x++) {
        if (document.getElementById("goodsname" + x.toString()).value == item) {
            if (confirm("确定要卖出" + item + ",卖出数量" + rand)) {
                if (document.getElementById("num" + x.toString()).value < rand) {
                    document.getElementById("goodsname" + x.toString()).value = "";
                    document.getElementById("num" + x.toString()).value = "";
                    var revenue = parseInt(capital.value, 10) + rand * parseInt(document.getElementById("price" + x.toString()).value, 10)
                    capital.value = parseInt(revenue, 10);
                    break;
                }

                if (document.getElementById("num" + x.toString()).value >= rand) {
                    var revenue = parseInt(capital.value, 10) + rand * parseInt(document.getElementById("price" + x.toString()).value, 10)
                    capital.value = parseInt(revenue, 10);
                    var newstocknum = parseInt(document.getElementById("num" + x.toString()).value, 10) - rand
                    document.getElementById("num" + x.toString()).value = newstocknum;
                    document.getElementById(Solditem).value = "";
                    break;
                }

            }
            else { onloadpagedata(); }
        }
    }
}
