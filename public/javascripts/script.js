function generateSeeds(
  entropy_length,
  bip39_mnemonics,
  bip39_passphrase,
  coin_type,
  account,
  change
) {
  $.ajax({
    type: "POST",
    url: "/bip/generate/seeds",
    data: {
      entropy_length: entropy_length,
      bip39_mnemonics: bip39_mnemonics,
      bip39_passphrase: bip39_passphrase
    },
    success: function(data) {
      if (data.error == "") {
        $("#bip39_mnemonics").val(data.data.mnemonics);
        $("#bip39_seed").val(data.data.seed);
        $("#bip39_entropy").val(data.data.entropy);
        $("#bip39_root_key_xprv").val(data.data.root_key_xprv);
        $("#bip39_root_key_xpub").val(data.data.root_key_xpub);

        hideError();
        generateAddresses(data.data.seed, coin_type, account, change);
      } else {
        showError(data.error);
      }
    }
  });
}

function generateMnemonic() {
  var entropy_length = $("#entropy_length").val();
  clear();

  $.ajax({
    type: "POST",
    url: "/bip/generate/mnemonic/new",
    data: {
      entropy_length: entropy_length
    },
    success: function(data) {
      $("#bip39_mnemonics").val(data.mnemonic);
      validateMnemonic();
    }
  });
}

function generateAddresses(seed, coin_type, account, change) {
  var purpose = "44";

  var account_deviation_path =
    "m/" + purpose + "'/" + coin_type + "'/" + account + "'";
  var change_deviation_path = account_deviation_path + "/" + change;

  $.ajax({
    type: "POST",
    url: "/bip/generate/addresses",
    data: {
      seed: seed,
      account_deviation_path: account_deviation_path,
      change_deviation_path: change_deviation_path,
      coin_type: coin_type
    },
    success: function(data) {
      $("#bip44_account_xprv").val(data.account_node_xprv);
      $("#bip44_account_xpub").val(data.account_node_xpub);
      $("#bip32_account_xprv").val(data.change_node_xprv);
      $("#bip32_account_xpub").val(data.change_node_xpub);
      $("#bip32_derivation_path").val(data.bip32_deviation_path);

      $("#bip44_account").val(account);
      $("#bip44_change").val(change);

      var addresses_table =
        "<table id=addresses border=1> <thead> <tr> <td> Path </td><td> Address </td><td> Public Key </td><td> Private Key </td> </tr> </thead> <tbody>";
      $.each(data.addresses, function() {
        addresses_table += "<tr>";
        addresses_table += "<td>" + this.deviation_path + "</td>";
        addresses_table += "<td>" + this.wallet_address + "</td>";
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

function validateMnemonic() {
  var bip39_mnemonics = $("#bip39_mnemonics").val();

  $.ajax({
    type: "POST",
    url: "/bip/generate/mnemonic/verify",
    data: {
      mnemonic: bip39_mnemonics
    },
    success: function(data) {
      if (data.result == true) {
        hideError();
        peformOperation();
        return;
      }
      showError("Invalid Mnemonic");
    }
  });
}

function peformOperation() {
  var entropy_length = $("#entropy_length").val();
  var bip39_mnemonics = $("#bip39_mnemonics").val();
  var bip39_passphrase = $("#bip39_passphrase").val();

  var coin_type = $("#coin_type").val();
  var account = parseInt($("#bip44_account").val());
  var change = parseInt($("#bip44_change").val());

  generateSeeds(
    entropy_length,
    bip39_mnemonics,
    bip39_passphrase,
    coin_type,
    account,
    change
  );
}

function showError(error) {
  $("#error").css("visibility", "visible");
  $("#error").html(error);
}

function hideError() {
  $("#error").css("visibility", "hidden");
}

$("#bip39_mnemonics").keyup(validateMnemonic);
$("#bip39_passphrase").keyup(validateMnemonic);
$("#coin_type").change(validateMnemonic);
$("#bip44_account").keyup(validateMnemonic);
$("#bip44_change").keyup(validateMnemonic);
