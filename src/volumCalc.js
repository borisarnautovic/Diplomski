//console.log('alpha: ' + data.alpha + ', beta: ' +  data.beta + ', gamma: ' + data.gamma);


// ---------------------------------------------------------------------------------------------------------------    

const calculateVolume = () => {

    let iDodeljena = false;
    let i = 0;
    let brBeta = 0;

    let jDodeljena = false;
    let j = 0;
    let brGamma = 0;

    let stabAlpha = 0;
    let alphaDodeljena = false;

    let volume = 0.5;
    console.log("volume je " + volume);

    //const coef = 0.00555555555555555555555555555556;

    const coef = 0.5 / 90;
     


    // -------------------------------------- Stabilizacija beta  --------------------------------------------------
    return (data) => 
    {
        // console.log(data);

        if (brBeta < 100 && data.beta) {

            if (iDodeljena == false) {
                i = data.beta;
                iDodeljena = true;
            };


            if (i - data.beta < 3 && i - data.beta > -3) {
                brBeta++;
            }
        }
        if (i - data.beta > 10 || i - data.beta < -10) {
            brBeta = 0;
            iDodeljena = false;
            alphaDodeljena = false;
        }

        if (brBeta == 100) {
            //console.log("Beta stabilozovano");
        }


        // -------------------------------------- Stabilizacija gamma  --------------------------------------------------




        if (brGamma < 100 && data.gamma) {

            if (jDodeljena == false) {
                j = data.gamma;
                jDodeljena = true;
            };


            if (j - data.gamma < 3 && j - data.gamma > -3) {
                brGamma++;
                //console.log(brGamma);

            }
            else {
                brGamma = 0;
                jDodeljena = false
            };
        };

        if (j - data.gamma > 10 || j - data.gamma < -10) {f
            brGamma = 0;
            jDodeljena = false;
            alphaDodeljena = false;
        }

        if (brGamma == 100) {
            //console.log("Gamma stabilozovano");
        }


        //----------------------------------------------------- KONTROLA ZVUKA ------------------------------------------
        if (brBeta >= 100 && brGamma >= 100) {
            if (!alphaDodeljena) {
                alphaDodeljena = true;
                //stabAlpha = 180;
                stabAlpha = data.alpha;
            }

            if (stabAlpha >= 90 && stabAlpha <= 270) {
                if (data.alpha >= Math.abs(stabAlpha - 90) && data.alpha <= Math.abs(stabAlpha + 90)) // alpha izmedju 90 i 270 i u slucaju smanjivanja do 360
                {

                    const razlika = stabAlpha - data.alpha;

                    volume = razlika * coef + 0.5;

                    //    console.log("drugi uslov");

                    if (volume >= 0 && volume <= 1) {
                        return (volume);
                    }
                }



            }
            else if (stabAlpha >= 270 && stabAlpha <= 360)
             {
                if (data.alpha >= Math.abs(stabAlpha - 90) && data.alpha <= Math.abs(stabAlpha + 90)) // u slucaju pojacavanja i smanjivanja do 360
                {

                    const razlika = stabAlpha - data.alpha;

                    volume = razlika * coef + 0.5;

                    // console.log("drugi uslov");

                    if (volume >= 0 && volume <= 1) {
                        return (volume);
                    }
                }

                else if (((stabAlpha + 90) - stabAlpha) >= data.alpha) //  u slucaju smanjivanja kad ide preko 360
                {

                    volume = ((360 - stabAlpha + data.alpha) * coef) * (-1) + 0.5;

                    // console.log("treci uslov");

                    if (volume >= 0 && volume <= 1) {
                        return (volume);
                    }
                }
            }
            else if (stabAlpha >= 0 && stabAlpha <= 90) 
            {
                if ((stabAlpha - data.alpha) <= 0) {
                    // let volume;
                    if ((data.alpha - stabAlpha) >= 270) //  kad predje 0 (od 360) 
                    {
                        volume = ((360 - (data.alpha - stabAlpha)) * coef) + 0.5;
                        //   console.log("ovde je prvi")
                    }
                    else  // volumen od 0.0 do 0.5
                    {

                        volume = ((Math.abs(stabAlpha - data.alpha) * (-1) * coef) + 0.5);



                        //   console.log("ovde je treci");                        
                    }

                    if (volume >= 0 && volume <= 1) {
                        return (volume);
                    }
                }

                else if ((stabAlpha - data.alpha) >= 0 && Math.abs(stabAlpha - data.alpha) < stabAlpha) // od alpha do 0 
                {
                    volume = (((stabAlpha - data.alpha) * coef) + 0.5);
                    //console.log("ovde je drugi")

                    if (volume >= 0 && volume <= 1) {
                        return (volume);
                    }
                }
            }
        };
        if (volume >= 0 && volume <= 1) {
            return (volume);
        }

        
    }
}

    

    
    
// ----------------------------------------------------------------------
export default calculateVolume;