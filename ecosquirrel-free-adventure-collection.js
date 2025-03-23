class EcosquirrelFreeSceneCollection {
}

Hooks.once("init", () => {
  game.settings.register("ecosquirrel-free-adventure-collection", "Ecosquirrel", {
    name: "URL",
    scope: "world",
    config: true,
    default: "http://www.ecosquirrel.de",
    type: String
  });

  Hooks.on("renderSettingsConfig", async (app, html, data) => {
    console.log("[Ecosquirrel] Einstellungen-UI wird modifiziert...");

    const sceneBasePath = "modules/ecosquirrel-free-adventure-collection/scene/";
    const scenecategories = {
      "coast": "coast/",
      "desert": "desert/",
      "forest": "forest/",
      "hill": "hill/",
      "ice": "ice/",
      "island": "island/",
      "jungle": "jungle/",
      "mountain": "mountain/",
      "swamp": "swamp/"
    };

    const tokenBasePath = "modules/ecosquirrel-free-adventure-collection/token/";
    const tokencategories = {
      "alligator": "alligator/",
      "beetleswarm": "beetleswarm/",
      "bedouin": "bedouin/",
      "crab": "crab/",
      "demon": "demon/",
      "fighter": "fighter/",
      "bear": "bear/",
      "mosquitoswarm": "mosquitoswarm/",
      "panther": "panther/",
      "scorpion": "scorpion/",
      "shark": "shark/",
      "snake": "snake/",
      "stag": "stag/",
      "troll": "troll/",
      "wildboar": "wildboar/",
      "wolf": "wolf/"
    };

    async function getImagesForSceneCategories() {
      let allImages = {};
      for (let scenecategory in scenecategories) {
        const fullPath = `${sceneBasePath}${scenecategories[scenecategory]}`;

        try {
          console.log(`[Ecosquirrel] Versuche Bilder aus ${fullPath} zu laden...`);
          
          const files = await FilePicker.browse("data", fullPath);
          
          if (!files || !files.files) {
            console.warn(`[Ecosquirrel] Ordner ${fullPath} ist leer oder nicht vorhanden.`);
            allImages[scenecategory] = [];
            continue;
          }

          allImages[scenecategory] = files.files.filter(file => {
            const fileName = file.split("/").pop();
            // Nur .webp-Dateien, die "1792x1024" im Dateinamen haben
            return fileName.endsWith(".webp") && fileName.includes("1792x1024");
          }).sort(() => 0.5 - Math.random()).slice(0, 3); // Zufällig 3 Bilder auswählen

          console.log(`[Ecosquirrel] Geladene Bilder für ${scenecategory}:`, allImages[scenecategory]);

        } catch (error) {
          console.error(`[Ecosquirrel] Fehler beim Laden der Bilder für ${scenecategory}:`, error);
          allImages[scenecategory] = [];
        }
      }
      return allImages;
    }

    async function getImagesForTokenCategories() {
      let allImages = {};
      for (let tokencategory in tokencategories) {
        const fullPath = `${tokenBasePath}${tokencategories[tokencategory]}`;

        try {
          console.log(`[Ecosquirrel] Versuche Bilder aus ${fullPath} zu laden...`);
          
          const files = await FilePicker.browse("data", fullPath);
          
          if (!files || !files.files) {
            console.warn(`[Ecosquirrel] Ordner ${fullPath} ist leer oder nicht vorhanden.`);
            allImages[tokencategory] = [];
            continue;
          }

          allImages[tokencategory] = files.files.filter(file => {
            const fileName = file.split("/").pop();
            return fileName.endsWith(".webp") && 
              ((tokencategory === "alligator" && fileName.includes("token_alligator")) ||
               (tokencategory === "fighter" && fileName.includes("token_fighter")) ||
               (tokencategory === "bear" && fileName.includes("token_bear")) ||
               (tokencategory === "beetleswarm" && fileName.includes("token_beetleswarm")) ||
               (tokencategory === "crab" && fileName.includes("token_crab")) ||
               (tokencategory === "demon" && fileName.includes("token_demon")) ||
               (tokencategory === "bedouin" && fileName.includes("token_bedouin")) ||
               (tokencategory === "mosquitoswarm" && fileName.includes("token_mosquitoswarm")) ||
               (tokencategory === "panther" && fileName.includes("token_panther")) ||
               (tokencategory === "scorpion" && fileName.includes("token_scorpion")) ||
               (tokencategory === "shark" && fileName.includes("token_shark")) ||
               (tokencategory === "snake" && fileName.includes("token_snake")) ||
               (tokencategory === "stag" && fileName.includes("token_stag")) ||
               (tokencategory === "troll" && fileName.includes("token_troll")) ||
               (tokencategory === "wildboar" && fileName.includes("token_wildboar")) ||
               (tokencategory === "wolf" && fileName.includes("token_wolf")));
          }).sort(() => 0.5 - Math.random()).slice(0, 2); // Zufällig 2 Bilder auswählen

          console.log(`[Ecosquirrel] Geladene Bilder für ${tokencategory}:`, allImages[tokencategory]);

        } catch (error) {
          console.error(`[Ecosquirrel] Fehler beim Laden der Bilder für ${tokencategory}:`, error);
          allImages[tokencategory] = [];
        }
      }
      return allImages;
    }

    function createTokenImageGallery(imageUrls) {
      let gallery = `
        <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center; max-width: 100%;" class="token-gallery">
      `;
      imageUrls.forEach(url => {
        gallery += `
          <div style="width: 130px; height: 130px; display: flex; justify-content: center; align-items: center;">
            <img src="${url}" style="width: 130px; height: 130pxs; object-fit: cover; border: none; box-shadow: none;">
          </div>`;
      });
      gallery += `</div>`;
      return gallery;
    }

    function createSceneImageGallery(imageUrls) {
      let gallery = `
        <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center; max-width: 100%;" class="token-gallery">
      `;
      imageUrls.forEach(url => {
        gallery += `
          <div style="width: 512; height: 292px; display: flex; justify-content: center; align-items: center;">
            <img src="${url}" style="width: 512px; height: 292pxs; object-fit: cover; border: none; box-shadow: none;">
          </div>`;
      });
      gallery += `</div>`;
      return gallery;
    }

    const settingsTab = html.find(`section[data-tab="ecosquirrel-free-adventure-collection"]`);
    if (settingsTab.length) {
      console.log("[Ecosquirrel] Tab für Modul gefunden, füge HTML hinzu...");

      html.find("h2.border:contains('Ecosquirrel Free Scene Collection')").remove();
      html.find("div.form-group[data-setting-id='ecosquirrel-free-adventure-collection.Ecosquirrel']").remove();
      html.find("button[type='submit']").remove();

      const header = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="https://www.ecosquirrel.de" target="_blank"><img src="modules/ecosquirrel-free-adventure-collection/images/ecosquirrel_logo_text.webp" style="width:200px; height: 40px; object-fit: cover; border: none; box-shadow: none;"></a>
        </div>
       `;
      const sceneheader = `<h2 id="scene-header" class="border" style="margin-top: 10px;">${game.i18n.localize("es.sceneSelection")}</h2>`
      const tokenheader = `<h2 id="token-header" class="border" style="margin-top: 10px;">${game.i18n.localize("es.tokenSelection")}</h2>`
      
      const scenelist = `
        ${game.i18n.localize("es.selectSceneCategoryDescription1")} 
        <ul>
          <li>${game.i18n.localize("es.category.coast")}, 
          ${game.i18n.localize("es.category.desert")}, 
          ${game.i18n.localize("es.category.forest")}, 
          ${game.i18n.localize("es.category.hill")}, 
          ${game.i18n.localize("es.category.ice")}, 
          ${game.i18n.localize("es.category.island")}, 
          ${game.i18n.localize("es.category.jungle")}, 
          ${game.i18n.localize("es.category.mountain")}, 
          ${game.i18n.localize("es.category.swamp")}
          </li>
        </ul>
        ${game.i18n.localize("es.selectSceneCategoryDescription2")} <br><br>  ${game.i18n.localize("es.selectSceneCategoryDescription4")}<br><br> 
        <ul>
          <li><code>${sceneBasePath}</code></li>
        </ul>
        ${game.i18n.localize("es.selectSceneCategoryDescription3")} 
        <br><label for="scene-selector">${game.i18n.localize("es.selectSceneCategory")}</label>
        <select id="scene-selector">
          <option value="randomscene">${game.i18n.localize("es.randomSceneSelection")}</option>
          <option value="coast">${game.i18n.localize("es.category.coast")}</option>
          <option value="desert">${game.i18n.localize("es.category.desert")}</option>
          <option value="forest">${game.i18n.localize("es.category.forest")}</option>
          <option value="hill">${game.i18n.localize("es.category.hill")}</option>
          <option value="ice">${game.i18n.localize("es.category.ice")}</option>
          <option value="island">${game.i18n.localize("es.category.island")}</option>
          <option value="jungle">${game.i18n.localize("es.category.jungle")}</option>
          <option value="mountain">${game.i18n.localize("es.category.mountain")}</option>
          <option value="swamp">${game.i18n.localize("es.category.swamp")}</option>
        </select>
        <div id="scene-container"></div>
      `;

      const tokenlist = `
        ${game.i18n.localize("es.selectTokenCategoryDescription1")} 
        <ul>
          <li>${game.i18n.localize("es.category.alligator")}, 
          ${game.i18n.localize("es.category.bear")}, 
          ${game.i18n.localize("es.category.crab")}, 
          ${game.i18n.localize("es.category.demon")}, 
          ${game.i18n.localize("es.category.panther")}, 
          ${game.i18n.localize("es.category.scorpion")}, 
          ${game.i18n.localize("es.category.shark")}, 
          ${game.i18n.localize("es.category.snake")}, 
          ${game.i18n.localize("es.category.stag")}, 
          ${game.i18n.localize("es.category.troll")}, 
          ${game.i18n.localize("es.category.wildboar")}, 
          ${game.i18n.localize("es.category.wolf")}
          </li>
          <li>
          ${game.i18n.localize("es.category.beetleswarm")}, 
          ${game.i18n.localize("es.category.mosquitoswarm")}, 
          </li>
          <li>
           ${game.i18n.localize("es.category.bedouin")},
           ${game.i18n.localize("es.category.fighter")}
          </li>
        </ul>
        ${game.i18n.localize("es.selectTokenCategoryDescription2")} 
        <ul>
          <li><code>${tokenBasePath}</code></li>
        </ul>
        ${game.i18n.localize("es.selectTokenCategoryDescription3")} 
        <br><label for="token-selector">${game.i18n.localize("es.selectTokenCategory")}</label>
        <select id="token-selector">
          <option value="randomtoken">${game.i18n.localize("es.randomTokenSelection")}</option>
          <option value="fighter">${game.i18n.localize("es.category.fighter")}</option>
          <option value="bedouin">${game.i18n.localize("es.category.bedouin")}</option>
          <option value="alligator">${game.i18n.localize("es.category.alligator")}</option>
          <option value="bear">${game.i18n.localize("es.category.bear")}</option>
          <option value="beetleswarm">${game.i18n.localize("es.category.beetleswarm")}</option>
          <option value="crab">${game.i18n.localize("es.category.crab")}</option>
          <option value="demon">${game.i18n.localize("es.category.demon")}</option>
          <option value="mosquitoswarm">${game.i18n.localize("es.category.mosquitoswarm")}</option>
          <option value="panther">${game.i18n.localize("es.category.panther")}</option>
          <option value="scorpion">${game.i18n.localize("es.category.scorpion")}</option>
          <option value="shark">${game.i18n.localize("es.category.shark")}</option>
          <option value="snake">${game.i18n.localize("es.category.snake")}</option>
          <option value="stag">${game.i18n.localize("es.category.stag")}</option>
          <option value="troll">${game.i18n.localize("es.category.troll")}</option>
          <option value="wildboar">${game.i18n.localize("es.category.wildboar")}</option>
          <option value="wolf">${game.i18n.localize("es.category.wolf")}</option>
        </select>
        <div id="token-container"></div>
      `;
      settingsTab.append(header + sceneheader + scenelist + tokenheader + tokenlist);

      const sceneContainer = settingsTab.find("#scene-container");
      const sceneHeader = settingsTab.find("#scene-header");

      getImagesForSceneCategories().then(allImages => {
        function updateGallery(selection) {
          selection = selection.trim();
          console.log(`[Ecosquirrel] Updating scene gallery with selection: ${selection}`);
          console.log(`[Ecosquirrel] Available scene categories:`, Object.keys(allImages));
          
          if (allImages[selection] && allImages[selection].length > 0) {
            console.log(`[Ecosquirrel] Found ${allImages[selection].length} images for ${selection}`);
            allImages[selection] = allImages[selection].sort(() => 0.5 - Math.random()).slice(0, 3);
            
            // Update the scene header text using jQuery properly
            $('#scene-header').text(`${game.i18n.localize("es.sceneSelection")} - ${game.i18n.localize(`es.category.${selection}`)}`);
            
            // Log the images we're about to display
            console.log(`[Ecosquirrel] Scene images for ${selection}:`, allImages[selection]);
            sceneContainer.html(createSceneImageGallery(allImages[selection]));
          } else {
            console.log(`[Ecosquirrel] No images found for ${selection}, using random selection`);
            $('#scene-header').text(`${game.i18n.localize("es.sceneSelection")} - ${game.i18n.localize("es.randomSceneSelection")}`);
            const randomSceneImages = Object.values(allImages).flat().sort(() => 0.5 - Math.random()).slice(0, 2);
            console.log(`[Ecosquirrel] Random scene images:`, randomSceneImages);
            sceneContainer.html(createSceneImageGallery(randomSceneImages));
          }
        }
        
        // Make sure the event listener is properly attached
        const sceneSelector = settingsTab.find("#scene-selector");
        console.log(`[Ecosquirrel] Setting up scene selector change event. Element found: ${sceneSelector.length > 0}`);
        
        sceneSelector.on("change", function() {
          console.log(`[Ecosquirrel] Scene selector changed to: ${this.value}`);
          updateGallery(this.value);
        });
        
        updateGallery("randomscene");
      });

      const tokenContainer = settingsTab.find("#token-container");
      const tokenHeader = settingsTab.find("#token-header");
      
      getImagesForTokenCategories().then(allImages => {
        function updateGallery(selection) {
          selection = selection.trim();

          if (allImages[selection] && allImages[selection].length > 0) {
            allImages[selection] = allImages[selection].sort(() => 0.5 - Math.random()).slice(0, 6);
            tokenHeader.text(`${game.i18n.localize("es.tokenSelection")} - ${game.i18n.localize(`es.category.${selection}`)}`);
            tokenContainer.html(createTokenImageGallery(allImages[selection]));
          } else {
            tokenHeader.text(`${game.i18n.localize("es.tokenSelection")} - ${game.i18n.localize("es.randomTokenSelection")}`);
            const randomTokenImages = Object.values(allImages).flat().sort(() => 0.5 - Math.random()).slice(0, 6);
            tokenContainer.html(createTokenImageGallery(randomTokenImages));
          }
        }
        
        settingsTab.find("#token-selector").on("change", function () {
          updateGallery(this.value);
        });
        
        updateGallery("randomtoken");
      });
    } else {
      console.warn("[Ecosquirrel] Modul-Tab nicht gefunden! Ist der Modul-Name korrekt?");
    }
  });
});