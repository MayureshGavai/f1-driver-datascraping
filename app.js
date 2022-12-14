import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';

async function getFormulaOneDrivers() {

    try {

        const response = await fetch('https://www.formula1.com/en/drivers.html');
        const body = await response.text();
        const $ = cheerio.load(body);

        // const wrapper = $('.listing-items--wrapper');
        // console.log(wrapper.length);
        
        const items = [];
        $('.listing-items--wrapper > .row > .col-12').map((i, el) => {

            const rank = $(el).find('.rank').text();
            const points = $(el).find('.points > .f1-wide--s').text();
            const firstName = $(el).find('.listing-item--name span:first').text();
            const lastName = $(el).find('.listing-item--name span:last').text();
            const team = $(el).find('.listing-item--team').text();
            const photo = $(el).find('.listing-item--photo img').attr('data-src');
            
            
            items.push({
                rank,
                points,
                firstName,
                lastName,
                team,
                photo
            })

        });

        fs.writeFile('f1scrapingdata.json', JSON.stringify(items), function(err) {
            if(err) return console.log(err);
            console.log('F1 Drivers where saved as: f1scrapingdata.json')
        });


    } catch (error) {
        console.log(error);
    }


}

getFormulaOneDrivers();