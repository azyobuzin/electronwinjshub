// ハブ テンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkID=286574
(function () {
    "use strict";

    window.strings = {
        "Section1": "Section 1",
        "Section1Subtext": "Lorem ipsum dolor sit nonumy sed consectetuer ising elit, sed diam",
        "Section1Description": "Lorem ipsum dolor sit amet, consectetur ising elit, sed diam nonummy nibh uismod tincidunt ut laoreet suscipit lobortis nisl ut wisi quipexerci quis consequat minim veniam, quis nostrud. exerci tation ullam corper.",

        "Section2": "Section 2",
        "Section2ItemTitle": "Item Title",
        "Section2ItemSubtitle": "Item Sub Title",
        "Section2Subtext": "Quisque in porta lorem dolor amet sed consectetuer ising elit, sed diam non my nibh uis mod wisi quip.",
        "Section2Description": "Lorem ipsum dolor sit amet, consectetur ising elit, sed diam nonummy nibh uismod tincidunt ut laoreet suscipit lobortis nisl ut wisi quipexerci quis consequat minim veniam, quis nostrud. exerci tation ullam corper.",

        "Section3": "Section 3",

        "Section4": "Section 4",
        "Section4Description": "Lorem ipsum dolor sit amet, consectetur ising elit, sed diam nonummy nibh uismod tincidunt ut laoreet suscipit lobortis nisl ut wisi quipexerci quis consequat minim veniam, quis nostrud. exerci tation ullam corper.",

        "DescriptionText": "Description text:",
        "SectionSubtitle": "セクションのサブタイトル"
    };

    var activation;
    if (window["Windows"])
        activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    if (activation)
        app.addEventListener("activated", function (args) {
            if (args.detail.kind === activation.ActivationKind.launch) {
                if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                    // TODO: このアプリケーションは新しく起動しました。ここでアプリケーションを
                    // 初期化します。
                } else {
                    // TODO: このアプリケーションは中断状態から再度アクティブ化されました。
                    // ここでアプリケーションの状態を復元します。
                }

                nav.history = app.sessionState.history || {};
                nav.history.current.initialPlaceholder = true;

                // アプリケーションの負荷を最適化し、スプラッシュ スクリーンの表示中に優先度が高いスケジュール済み作業を実行します。
                ui.disableAnimations();
                var p = ui.processAll().then(function () {
                    return nav.navigate(nav.location || Application.navigator.home, nav.state);
                }).then(function () {
                    return sched.requestDrain(sched.Priority.aboveNormal + 1);
                }).then(function () {
                    ui.enableAnimations();
                });

                args.setPromise(p);
            }
        });
    else
        app.onready = function () {
            ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });
        };

    app.oncheckpoint = function (args) {
        // TODO: このアプリケーションは中断しようとしています。ここで中断中に
        // 維持する必要のある状態を保存します。アプリケーションが中断される前に 
        // 非同期操作を終了する必要がある場合は 
        // args.setPromise() を呼び出してください。
        app.sessionState.history = nav.history;
    };

    app.start();
})();
