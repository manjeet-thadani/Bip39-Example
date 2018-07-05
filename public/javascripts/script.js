function generateBIP39() {
  var entropy_length = $("#entropy_length").val();
  var bip39_mnemonics = $("#bip39_mnemonics").val();
  var bip39_passphrase = $("#bip39_passphrase").val();

  $.ajax({
    type: "POST",
    url: "/generate/seeds",
    data: {
      entropy_length: entropy_length,
      bip39_mnemonics: bip39_mnemonics,
      bip39_passphrase: bip39_passphrase
    },
    success: function(data) {
      clear();

      if (data.error == "") {
        $("#bip39_mnemonics").val(data.data.mnemonics);
        $("#bip39_seed").val(data.data.seed);
        $("#bip39_entropy").val(data.data.entropy);
        $("#bip39_root_key_xprv").val(data.data.root_key_xprv);
        $("#bip39_root_key_xpub").val(data.data.root_key_xpub);
      } else {
        $("#error_bip39_mnemonics").html(data.error);
      }
    }
  });
}

function generateAddresses() {
  var seed = $("#bip39_seed").val();
  var purpose = $("#bip44_pupose").val();
  var coin_type = $("#coin_type").val();
  var account = $("#bip44_account").val();
  var change = $("#bip44_change").val();

  var account_deviation_path =
    "m/" + purpose + "'/" + coin_type + "'/" + account + "'";
  var change_deviation_path = account_deviation_path + "/" + change;

  $.ajax({
    type: "POST",
    url: "/generate/addresses",
    data: {
      seed: seed,
      account_deviation_path: account_deviation_path,
      change_deviation_path: change_deviation_path
    },
    success: function(data) {
      $("#bip44_account_xprv").val(data.account_node_xprv);
      $("#bip44_account_xpub").val(data.account_node_xpub);
      $("#bip32_account_xprv").val(data.change_node_xprv);
      $("#bip32_account_xpub").val(data.change_node_xpub);

      var addresses_table =
        "<table id=addresses> <thead> <tr> <td> Path </td><td> Public Key </td><td> Private Key </td> </tr> </thead> <tbody>";
      $.each(data.addresses, function() {
        addresses_table += "<tr>";
        addresses_table += "<td>" + this.address_index_deviation_path + "</td>";
        addresses_table += "<td>" + this.public_key + "</td>";
        addresses_table += "<td>" + this.private_key + "</td>";
        addresses_table += "</tr>";
      });

      addresses_table += "</body> </table>";

      $("#address_index").html(addresses_table);
    }
  });
}

function clear() {
  $("#bip39_mnemonics").val("");
  $("#bip39_seed").val("");
  $("#bip39_entropy").val("");
  $("#bip39_root_key_xprv").val("");
  $("#bip39_root_key_xpub").val("");

  $("#bip44_account").val("0");
  $("#bip44_change").val("0");
  $("#bip44_account_xprv").val("");
  $("#bip44_account_xpub").val("");
  $("#bip32_account_xprv").val("");
  $("#bip32_account_xpub").val("");

  $("#error_bip39_mnemonics").html("");
  $("#address_index").html("");
}

function populateCart(data) {
  var cartInfo = '<h5 id="error"> ' + data.error + "</h5>";

  if (data.status == "success") {
    cartInfo += '<div class="products_list">';
    cartInfo +=
      '<h4 style="margin-left:50px;"> My Cart (' +
      data.cart_info.total_items +
      ")</h4> <hr>";

    $.each(data.cart_info.products, function() {
      cartInfo += '<div class="product"> <div class="product_image"> <center>';
      cartInfo +=
        '<img src="/uploads/' + this.product_images + '" height="160px;"> <br>';

      cartInfo +=
        '<form class="update_quantity_form" action="/user/shopping-cart/' +
        this.product_uuid +
        '"  method="POST" style="margin-top: 10px">';
      cartInfo += '<input type="hidden" name="_method" value="PUT">';
      cartInfo +=
        '<input type="hidden" name="product_id" value="' +
        this.product_id +
        '">';
      cartInfo +=
        '<input id="enter_qty" type="number" min="1" name="product_quantity" style="width : 40px; text-align: center;" value="' +
        this.product_quantity +
        '" required>';
      cartInfo +=
        '<input type="submit" style="margin-left: 5px;" value="✔"> </form>';
      cartInfo += "</center> </div>";

      cartInfo += "<div class='product_details'>";
      cartInfo +=
        "<h4> " +
        this.product_name +
        "</h4> <br> <h3> <strong> ₹ " +
        this.product_cost +
        "</strong> </h3> <h6> Quantity - " +
        this.product_quantity +
        "</h6> <br> ";

      cartInfo +=
        '<form class="remove_product_form" action="/user/shopping-cart/' +
        this.product_uuid +
        '"  method="POST">';
      cartInfo += '<input type="hidden" name="_method" value="DELETE">';
      cartInfo +=
        '<button type="submit" class="links">REMOVE</button> </form> </div>';

      cartInfo +=
        '<div class="delivery_info"> <h6> Free delivery in 7-8 days </h6> <p style="font-size:12px;"> 10 Days Replacement Policy </p>';

      cartInfo += "</div> </div> <hr>";
    });
    cartInfo += "</div> ";

    cartInfo +=
      "<center class=total_amount> <h6> <strong style='color:grey;'> DETAILS </strong> </h6> <hr>";
    cartInfo += "<table> ";
    cartInfo +=
      "<tr> <td class='c1'> <h6> Total Items </h6> </td> <td class='c2'> <h6>" +
      data.cart_info.total_items +
      "</h6> </td> </tr>";

    cartInfo +=
      "<tr> <td class='c1'> <h6> Price </h6> </td> <td class='c2'> <h6> ₹ " +
      data.cart_info.total_cost +
      "</h6> </td> </tr>";

    cartInfo +=
      "<tr> <td class='c1'> <h6> Delivery Charges </h6> </td> <td class='c2' style='color:green;'> <h6> Free </h6> </td> </tr> </table> <hr>";

    cartInfo += "<table> ";
    cartInfo +=
      "<tr> <td class='c1'> <h5> <strong> Amount Payable </strong> </h5> </td> <td class='c2'> <h5> <strong> ₹ " +
      data.cart_info.total_cost +
      "</h5> </td> </tr> </table> <hr>";

    cartInfo +=
      "<form class='place_order_form' action='/user/order' method='POST' style='width: 100%;'>";
    cartInfo +=
      "<input type='hidden' name='cart_id' value='" + data.cart_id + "' >";
    cartInfo +=
      "<button class='place_order' type='submit'> <strong id='place_order_text' > PLACE ORDER </strong></button>";
    cartInfo += "</form> </div>";
  }

  $("#cart").html(cartInfo);
}
