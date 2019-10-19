// ==UserScript==
// @name         SpeedPost @ D4rK AnGl3
// @namespace    IndianSpeedPost
// @version      3.2
// @description  Be like a hungry soul seeking for knowledege.
// @author       D4rK AnGl3
// @include      https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx
// @require      https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.js
// ==/UserScript==

(function() {
    'use strict';

    function GetCaptcha()
    {
        var captchaTypes, i, currentCaptcha, captcha, currentCaptchaType;

        captchaTypes = [ "captchaimg", "captchamath" ];

        for( i=0; i < captchaTypes.length; i++)
        {
            try
            {
                currentCaptcha = document.getElementsByClassName(captchaTypes[i])[0];

                if( currentCaptcha.innerText.length )
                {
                    if( currentCaptcha.innerText.indexOf('=') == -1 )
                    {
                        captcha = currentCaptcha.innerText.split(",");
                    }

                    else if( currentCaptcha.innerText.indexOf('=') != -1 )
                    {
                        captcha = currentCaptcha.innerText.split("=")[0];
                    }

                    currentCaptchaType = captchaTypes[i];

                    break;
                }
            }
            catch( error )
            {
                console.log( error );
            }
        }

        try
        {
            if( i == captchaTypes.length )
            {
                throw "New Captcha mode or Hidden ";
            }
        }
        catch( error )
        {
            console.log( error );
        }

        document.getElementById("ctl00_PlaceHolderMain_ucOERControl_ucCaptcha1_imgbtnCaptcha").click();

        console.log(captcha);

        return [captcha, currentCaptchaType];
    }

    function SolveCaptcha(captcha, captchaType)
    {
        var captchaAnswer, captchaOperation, i;

        var ordinal = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth",
       "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"];

        if( captchaType == "captchaimg" )
        {
            captchaAnswer = captcha;
        }

        else if( captchaType == "captchamath" )
        {
            captchaOperation = document.getElementById("ctl00_PlaceHolderMain_ucOERControl_ucCaptcha1_lblCaptcha").innerText;

            if( captchaOperation.indexOf("Expression") != -1 )
            {
                captchaAnswer = eval(captcha);
            }

            else
            {
                for( i=0; i < ordinal.length; i++ )
                {
                    if( captchaOperation.indexOf(ordinal[i]) != -1 )
                    {
                        captchaAnswer = captcha[--i];

                        break;
                    }
                }
            }
        }

        document.getElementById("ctl00_PlaceHolderMain_ucOERControl_ucCaptcha1_txtCaptcha").value = captchaAnswer;

        return captchaAnswer;
    }

    function SetConsignmentNumber()
    {
        document.getElementById("ctl00_PlaceHolderMain_ucOERControl_txtOrignlPgTranNo").value = "";                 //        BRUTE FORCE IT
    }

    function Submit()
    {
        document.getElementById("ctl00_PlaceHolderMain_ucOERControl_btnSearch").click();
    }

    function Main()
    {
        SetConsignmentNumber();

        var captchaConf = GetCaptcha();

        SolveCaptcha( captchaConf[0], captchaConf[1] );

        Submit();
    }

    Main();

})();
