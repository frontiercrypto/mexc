const fs = require('fs');
const { firefox } = require('playwright');

// Helper function to add timeout and handle Escape press without rejecting the promise
async function withTimeout(action, page, timeout = 2000) {
    const actionPromise = action();
    const timeoutPromise = new Promise(async (resolve) => {
        setTimeout(async () => {
            for (let i = 0; i < 5; i++) {
                await page.keyboard.press('Escape');
            }
            resolve();
        }, timeout);
    });

    return Promise.race([actionPromise, timeoutPromise]);
}

// Main function
(async () => {
    const overallTimeout = 180000;
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout exceeded')), overallTimeout));

    try {
        const browser = await firefox.launch({ headless: true });
        const context = await browser.newContext();

        // Load cookies
        const cookies = JSON.parse(fs.readFileSync('to.json'));
        await context.addCookies(cookies);

        // Set HTTP headers
        await context.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'Authorization': 'WEBf88c3de161db4a77dc696c85c84a1c723ff8498b01c37228a3007765370f40ed'
        });

        const page = await context.newPage();

        // Navigate to the page without timeout handling
        const symbolok = process.argv[2];
        await page.goto(`https://futures.mexc.com/es-ES/exchange/${symbolok}`);

        // Press Escape 3 times to clear any initial modals
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Escape');
        }

        await withTimeout(() => page.waitForSelector('svg.ant-dropdown-trigger.icon-drop'), page);
        await withTimeout(() => page.click('svg.ant-dropdown-trigger.icon-drop'), page);
        await page.waitForTimeout(1000);
        await withTimeout(() => page.waitForSelector('.ant-dropdown-menu'), page);
        await withTimeout(() => page.click('li.ant-dropdown-menu-item:has-text("Post Only")'), page);

        await withTimeout(() => page.waitForSelector('svg.ant-dropdown-trigger.icon-drop'), page);
        await withTimeout(() => page.click('svg.ant-dropdown-trigger.icon-drop'), page);
        
        await withTimeout(() => page.waitForSelector('.ant-dropdown-menu'), page);
        await withTimeout(() => page.click('li.ant-dropdown-menu-item:has-text("Post Only")'), page);
        
        

        await withTimeout(() => page.waitForSelector('span.EntrustTabs_dropdownTab__vGFpN button.ant-btn.ant-btn-default'), page);
        await withTimeout(() => page.click('span.EntrustTabs_dropdownTab__vGFpN button.ant-btn.ant-btn-default'), page);

        await withTimeout(() => page.waitForSelector('span.EntrustTabs_dropdownTab__vGFpN button.ant-btn.ant-btn-default'), page);
        await withTimeout(() => page.click('span.EntrustTabs_dropdownTab__vGFpN button.ant-btn.ant-btn-default'), page);

       
        // Take Profit
        await withTimeout(() => page.waitForSelector('div.InputNumberExtend_wrapper__qxkpD.extend-wrapper span.component_refreshText__hpDCL'), page);
        await withTimeout(() => page.click('div.InputNumberExtend_wrapper__qxkpD.extend-wrapper span.component_refreshText__hpDCL'), page);

        await page.waitForTimeout(1000);

        await withTimeout(() => page.waitForSelector('label.ant-checkbox-wrapper:has-text("Long TP/SL") input.ant-checkbox-input'), page);
        await withTimeout(() => page.click('label.ant-checkbox-wrapper:has-text("Long TP/SL") input.ant-checkbox-input'), page);
        
        await withTimeout(() => page.waitForSelector('div.component_titleWrapperNormal__l_Vch:has(p:has-text("Take Profit")) div.ant-dropdown-trigger.component_flexEnd__8jJQ0.component_stopOrderCalcTypeStr__G_7EX.component_stopCalcTypeSelectNormal__g1fD6'), page);
        await withTimeout(() => page.click('div.component_titleWrapperNormal__l_Vch:has(p:has-text("Take Profit")) div.ant-dropdown-trigger.component_flexEnd__8jJQ0.component_stopOrderCalcTypeStr__G_7EX.component_stopCalcTypeSelectNormal__g1fD6'), page);

        await withTimeout(() => page.waitForSelector('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child[role="menuitem"] span.ant-dropdown-menu-title-content:has-text("ROE")'), page);
        await withTimeout(() => page.click('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child[role="menuitem"] span.ant-dropdown-menu-title-content:has-text("ROE")'), page);
        await withTimeout(() => page.click('div.component_quickWaveBtn__Itd_Y:has-text("100%")'), page);

        await withTimeout(() => page.waitForSelector('div.contractInfo_tabsContent__InhuP span[data-testid="contract-chart-wrapper-risk-limit"]:has-text("Límite de riesgo")'), page);
        await withTimeout(() => page.click('div.contractInfo_tabsContent__InhuP span[data-testid="contract-chart-wrapper-risk-limit"]:has-text("Límite de riesgo")'), page);

        await withTimeout(() => page.waitForSelector('div.component_titleWrapperNormal__l_Vch:has(p:has-text("Take Profit")) div.ant-dropdown-trigger.component_flexEnd__8jJQ0.component_stopOrderCalcTypeStr__G_7EX.component_stopCalcTypeSelectNormal__g1fD6'), page);
        await withTimeout(() => page.click('div.component_titleWrapperNormal__l_Vch:has(p:has-text("Take Profit")) div.ant-dropdown-trigger.component_flexEnd__8jJQ0.component_stopOrderCalcTypeStr__G_7EX.component_stopCalcTypeSelectNormal__g1fD6'), page);

        await withTimeout(() => page.waitForSelector('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child[role="menuitem"] span.ant-dropdown-menu-title-content:has-text("ROE")'), page);
        await withTimeout(() => page.click('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child[role="menuitem"] span.ant-dropdown-menu-title-content:has-text("ROE")'), page);
        await withTimeout(() => page.click('div.component_quickWaveBtn__Itd_Y:has-text("100%")'), page);

       
        // Ensure "Órdenes abiertas" tab is selected at the start of each loop iteration
        
        await withTimeout(() => page.waitForSelector('div.HideOtherPairs_showAll__eru_b.hide-other-pairs:has(span:has-text("Ocultar otros pares")) span.ant-checkbox'), page);
        await withTimeout(() => page.click('div.HideOtherPairs_showAll__eru_b.hide-other-pairs:has(span:has-text("Ocultar otros pares")) span.ant-checkbox'), page);
        await page.waitForTimeout(1000);
        await withTimeout(() => page.waitForSelector('div.ant-tabs-nav-list'), page);
        await withTimeout(() => page.click('div.ant-tabs-nav-list div.ant-tabs-tab span:has-text("Órdenes abiertas")'), page);


        const originalContent = await page.evaluate(() => {
            const tablist = document.querySelector('div[role="tablist"].ant-tabs-nav');
            return tablist ? tablist.innerText : null;
        });

        // Main loop to check for 'Posiciones(0)' and interact accordingly
        while (true) {
            const posicionesText = await page.evaluate(() => {
                const tablist = document.querySelector('div[role="tablist"].ant-tabs-nav');
                return tablist ? tablist.innerText : null;
            });
        
            if (posicionesText && posicionesText === originalContent) {

                await withTimeout(() => page.waitForSelector('svg.ant-dropdown-trigger.icon-drop'), page);
                await withTimeout(() => page.click('svg.ant-dropdown-trigger.icon-drop'), page);
                
                await withTimeout(() => page.waitForSelector('.ant-dropdown-menu'), page);
                await withTimeout(() => page.click('li.ant-dropdown-menu-item:has-text("Post Only")'), page);

                        
                // Further actions for "Posiciones(0)" case
                await withTimeout(() => page.waitForSelector('div.InputNumberExtend_wrapper__qxkpD.extend-wrapper span.component_refreshText__hpDCL'), page);
                await withTimeout(() => page.click('div.InputNumberExtend_wrapper__qxkpD.extend-wrapper span.component_refreshText__hpDCL'), page);
                await withTimeout(() => page.waitForSelector('div.component_numberInput__h86N3:has(span:has-text("Cantidad"))'), page);
                await withTimeout(() => page.fill('div.component_numberInput__h86N3:has(span:has-text("Cantidad")) input', '40'), page);
                await withTimeout(() => page.click('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child[role="menuitem"] span.ant-dropdown-menu-title-content:has-text("ROE")'), page);
                await withTimeout(() => page.click('div.component_quickWaveBtn__Itd_Y:has-text("100%")'), page);
                await withTimeout(() => page.click('button[data-testid="contract-trade-open-short-btn"]'), page);

            } else {
                break;
            }
        }
        
        const originalContento = await page.evaluate(() => {
            const tablist = document.querySelector('div[role="tablist"].ant-tabs-nav');
            return tablist ? tablist.innerText : null;
        });

        // Main loop to check for 'Posiciones(0)' and interact accordingly
        while (true) {
            const posicionesText = await page.evaluate(() => {
                const tablist = document.querySelector('div[role="tablist"].ant-tabs-nav');
                return tablist ? tablist.innerText : null;
            });

            // Locate and click "Cancelar Todo"
            await withTimeout(() => page.waitForSelector('div.position_oneClickWrapper__zx4AJ a:has-text("Cancelar Todo")'), page);
            await withTimeout(() => page.click('div.position_oneClickWrapper__zx4AJ a:has-text("Cancelar Todo")'), page);

            await page.waitForTimeout(1000);

            // Wait for the confirmation modal and click "Confirmar" button
            await withTimeout(() => page.waitForSelector('div.CancelAllConfirmModal_footer__anqap button.ant-btn.ant-btn-primary span:has-text("Confirmar")'), page);
            await withTimeout(() => page.click('div.CancelAllConfirmModal_footer__anqap button.ant-btn.ant-btn-primary span:has-text("Confirmar")'), page);
            
            await page.waitForTimeout(30000);
        
            if (posicionesText && posicionesText === originalContento) {

                await withTimeout(() => page.waitForSelector('[data-testid="contract-trade-order-form-tab-close"]'), page);
                await withTimeout(() => page.click('[data-testid="contract-trade-order-form-tab-close"]'), page);

                await withTimeout(() => page.waitForSelector('svg.ant-dropdown-trigger.icon-drop'), page);
                await withTimeout(() => page.click('svg.ant-dropdown-trigger.icon-drop'), page);
                await withTimeout(() => page.waitForSelector('.ant-dropdown-menu'), page);
                await withTimeout(() => page.click('li.ant-dropdown-menu-item:has-text("Post Only")'), page);
                
                // Further actions for "Posiciones(0)" case
                await withTimeout(() => page.click('[data-testid="contract-trade-order-form-tab-open"]'), page);        
                await withTimeout(() => page.click('div.ant-slider-step > span[style="left: 100%; transform: translateX(-50%);"]'), page);
                await withTimeout(() => page.click('div.InputNumberExtend_wrapper__qxkpD.extend-wrapper span.component_refreshText__hpDCL'), page);
                await withTimeout(() => page.click('[data-testid="contract-trade-order-form-tab-close"]'), page);
                await withTimeout(() => page.click('button[data-testid="contract-trade-close-short-btn"]'), page);
                await withTimeout(() => page.click('button[data-testid="contract-trade-close-long-btn"]'), page);

                await page.waitForTimeout(1000);

                // Check if "Órdenes abiertas" contains a number other than "(0)"
                const ordenesAbiertasText = await page.evaluate(() => {
                    const tabs = Array.from(document.querySelectorAll('div.ant-tabs-tab'));
                    const ordenesAbiertasTab = tabs.find(tab => tab.innerText.includes("Órdenes abiertas"));
                    return ordenesAbiertasTab ? ordenesAbiertasTab.innerText : null;
                });

                // If "Órdenes abiertas" contains any number other than "(0)", click "Cancelar Todo"
                if (ordenesAbiertasText) {
                    const match = ordenesAbiertasText.match(/\((\d+)\)/);
                    const hasOrders = match && match[1] !== '0';

                    if (hasOrders) {
                        await page.waitForTimeout(7000);

                        // Locate and click "Cancelar Todo"
                        await withTimeout(() => page.waitForSelector('div.position_oneClickWrapper__zx4AJ a:has-text("Cancelar Todo")'), page);
                        await withTimeout(() => page.click('div.position_oneClickWrapper__zx4AJ a:has-text("Cancelar Todo")'), page);

                        await page.waitForTimeout(1000);

                        // Wait for the confirmation modal and click "Confirmar" button
                        await withTimeout(() => page.waitForSelector('div.CancelAllConfirmModal_footer__anqap button.ant-btn.ant-btn-primary span:has-text("Confirmar")'), page);
                        await withTimeout(() => page.click('div.CancelAllConfirmModal_footer__anqap button.ant-btn.ant-btn-primary span:has-text("Confirmar")'), page);
                        
                        await page.waitForTimeout(1000);

                    } else {
                        continue; // Restart the loop if "(0)" is not present
                    }
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        await page.waitForTimeout(1000);

        // Close the browser
        await browser.close();

    } catch (error) {
        process.exit(1); // Exit process on error
    }
    process.exit(0);
})();
