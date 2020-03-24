console.log("sanity check", $);

(function() {
    var currentPLayer = "red";

    $(".column").on("mouseenter", function(e) {
        console.log("mouseover happening");
        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("red") &&
                !slotsInCol.eq(i).hasClass("black")
            ) {
                slotsInCol.children(i).addClass("highlightedHole");
                // $("p .turn").text(currentPLayer + "your turn...");
                break;
            }
        }
    });

    $(".column").on("mouseleave", function(e) {
        console.log("mouseleave happening");
        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("red") &&
                !slotsInCol.eq(i).hasClass("black")
            ) {
                slotsInCol.children(i).removeClass("highlightedHole");
                // $("p .turn").text(currentPLayer + "your turn...");
                break;
            }
        }
    });

    $(".column").on("click", function(e) {
        console.log("column clicked");
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        var colIsFull = true;

        $("audio#button")[0].play();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("red") &&
                !slotsInCol.eq(i).hasClass("black")
            ) {
                colIsFull = false;
                slotsInCol.eq(i).addClass(currentPLayer);
                // $("p .turn").text(currentPLayer + "your turn...");
                break;
            }
        }
        var slotsInRow = $(".row" + i);
        console.log("i: ", i);
        console.log("slotsInRow: ", slotsInRow);

        if (colIsFull) {
            return;
        }

        if (checkForVictory(slotsInCol)) {
            // console.log("win column");
            $("#turn").fadeOut();
            openDialog();
        } else if (checkForVictory(slotsInRow)) {
            // console.log("win row");
            openDialog();
            $("#turn").fadeOut();
        } else {
            checkForDiagonalVictory();
        }

        switchPlayers();
    });

    // here you check for victory

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPLayer)) {
                count++;
                if (count == 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function checkForDiagonalVictory() {
        var slots = $(".slot");
        var victories = [
            [slots.eq(0), slots.eq(7), slots.eq(14), slots.eq(21)],
            [slots.eq(7), slots.eq(14), slots.eq(21), slots.eq(28)],
            [slots.eq(14), slots.eq(21), slots.eq(28), slots.eq(35)],
            [slots.eq(1), slots.eq(8), slots.eq(15), slots.eq(22)],
            [slots.eq(8), slots.eq(15), slots.eq(22), slots.eq(29)],
            [slots.eq(2), slots.eq(9), slots.eq(16), slots.eq(23)],
            [slots.eq(6), slots.eq(13), slots.eq(20), slots.eq(27)],
            [slots.eq(13), slots.eq(20), slots.eq(27), slots.eq(34)],
            [slots.eq(20), slots.eq(27), slots.eq(34), slots.eq(41)],
            [slots.eq(12), slots.eq(19), slots.eq(26), slots.eq(33)],
            [slots.eq(19), slots.eq(26), slots.eq(33), slots.eq(40)],
            [slots.eq(18), slots.eq(25), slots.eq(32), slots.eq(39)],
            [slots.eq(18), slots.eq(13), slots.eq(8), slots.eq(3)],
            [slots.eq(24), slots.eq(19), slots.eq(14), slots.eq(9)],
            [slots.eq(19), slots.eq(14), slots.eq(9), slots.eq(4)],
            [slots.eq(30), slots.eq(25), slots.eq(20), slots.eq(15)],
            [slots.eq(25), slots.eq(20), slots.eq(15), slots.eq(10)],
            [slots.eq(20), slots.eq(15), slots.eq(10), slots.eq(5)],
            [slots.eq(36), slots.eq(31), slots.eq(26), slots.eq(21)],
            [slots.eq(31), slots.eq(26), slots.eq(21), slots.eq(16)],
            [slots.eq(26), slots.eq(21), slots.eq(16), slots.eq(11)],
            [slots.eq(37), slots.eq(32), slots.eq(27), slots.eq(22)],
            [slots.eq(32), slots.eq(27), slots.eq(22), slots.eq(17)],
            [slots.eq(38), slots.eq(33), slots.eq(28), slots.eq(23)]
        ];

        for (var i = 0; i < victories.length; i++) {
            var victoriesRow = victories[i];
            for (var j = 0; j < victoriesRow.length; j++) {
                if (
                    victoriesRow[0].hasClass(currentPLayer) &&
                    victoriesRow[1].hasClass(currentPLayer) &&
                    victoriesRow[2].hasClass(currentPLayer) &&
                    victoriesRow[3].hasClass(currentPLayer)
                ) {
                    openDialog();
                    $("#turn").fadeOut();
                    // location.reload();
                    return;
                }
            }
        }
    }

    function switchPlayers() {
        if (currentPLayer == "red") {
            currentPLayer = "black";
            // $("#turn").text("Black, you're up...");
            setTimeout(black, 600);
        } else {
            currentPLayer = "red";
            // $("#turn").text("Red, you're up...");
            setTimeout(red, 600);
        }

        // $("p .turn").html(currentPLayer + ", your turn...");
        // $("body").append("<p>" + currentPLayer + "</p>");
    }

    function red() {
        $("#turn").text("Red, you're up...");
        $("#turn").css({ color: "#ed3833" });
    }

    function black() {
        $("#turn").text("Black, you're up...");
        $("#turn").css({ color: "black" });
    }

    $(".close").on("click", function() {
        location.reload();
    });

    function openDialog() {
        $("#dialogTransparecy").css({
            visibility: "visible"
        });
        $("#dialogParent").css({
            height: "100%",
            width: "100%"
        });
        $("#dialog").css({
            height: "200px",
            width: "100%"
        });
        $(".close").css({
            "font-size": "30px"
        });
        $("#dialog").append(
            '<p id="dialog-text">' + currentPLayer + " wins!!!" + "</p>"
        );
        setTimeout(audioWin, 360);
        // $("audio#win")[0].play();
    }

    function audioWin() {
        $("audio#win")[0].play();
    }
})();
