class EcosquirrelFreeSceneCollection {
}

Hooks.once("init", () => {
  game.settings.register("ecosquirrel-free-scene-collection", "Ecosquirrel", {
    name: "URL",
    scope: "world",
    config: true,
    default: "http://www.ecosquirrel.de",
    type: String
  });

  Hooks.on("renderSettingsConfig", async (app, html, data) => {
    console.log("[Ecosquirrel] Einstellungen-UI wird modifiziert...");

    const tokenBasePath = "modules/ecosquirrel-scene-token-collection/token/";
    const tokencategories = {
      "alligator": "alligator/",
      "beetleswarm": "beetleswarm/",
      "bedouin": "bedouin/",
      "crap": "crap/",
      "deer": "deer/",
      "demon": "demon/",
      "fighter": "fighter/",
      "icebear": "icebear/",
      "mosquito": "mosquito/",
      "panther": "panther/",
      "scorpion": "scorpion/",
      "shark": "shark/",
      "snake": "snake/",
      "troll": "troll/",
      "wildboar": "wildboar/",
      "wolf": "wolf/"
    };

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
               (tokencategory === "icebear" && fileName.includes("token_icebear")) ||
               (tokencategory === "bettleswarm" && fileName.includes("token_beetleswarm")) ||
               (tokencategory === "crap" && fileName.includes("token_crap")) ||
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
               (tokencategory === "wolf" && fileName.includes("wolf")));
          }).sort(() => 0.5 - Math.random()).slice(0, 2); // Zufällig 2 Bilder auswählen

          console.log(`[Ecosquirrel] Geladene Bilder für ${tokencategory}:`, allImages[tokencategory]);

        } catch (error) {
          console.error(`[Ecosquirrel] Fehler beim Laden der Bilder für ${tokencategory}:`, error);
          allImages[tokencategory] = [];
        }
      }
      return allImages;
    }

    function createImageGallery(imageUrls) {
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

    const settingsTab = html.find(`section[data-tab="ecosquirrel-free-scene-collection"]`);
    if (settingsTab.length) {
      console.log("[Ecosquirrel] Tab für Modul gefunden, füge HTML hinzu...");

      html.find("h2.border:contains('Ecosquirrel Free Scene Collection')").remove();
      html.find("div.form-group[data-setting-id='ecosquirrel-free-scene-collection.Ecosquirrel']").remove();
      html.find("button[type='submit']").remove();

      const header = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="https://www.ecosquirrel.de" target="_blank"><img src="modules/ecosquirrel-free-scene-collection/images/ecosquirrel_logo_text.webp" style="width:200px; height: 40px; object-fit: cover; border: none; box-shadow: none;"></a>
        </div>
        <h2 id="token-header" class="border" style="margin-top: 10px;">${game.i18n.localize("es.tokenSelection")}</h2>
      `;

      const dropdown = `
        ${game.i18n.localize("es.selectCategoryDescription1")} 
        <ul>
          <li>${game.i18n.localize("es.category.alligator")}</li>
          <li>${game.i18n.localize("es.category.bear")}</li>
          <li>${game.i18n.localize("es.category.beetleswarm")}</li>
          <li>${game.i18n.localize("es.category.crap")}</li>
          <li>${game.i18n.localize("es.category.demon")}</li>
          <li>${game.i18n.localize("es.category.bedouin")}</li>
          <li>${game.i18n.localize("es.category.fighter")}</li>
          <li>${game.i18n.localize("es.category.mosquitoswarm")}</li>
          <li>${game.i18n.localize("es.category.panther")}</li>
          <li>${game.i18n.localize("es.category.scorpion")}</li>
          <li>${game.i18n.localize("es.category.shark")}</li>
          <li>${game.i18n.localize("es.category.snake")}</li>
          <li>${game.i18n.localize("es.category.stag")}</li>
          <li>${game.i18n.localize("es.category.troll")}</li>
          <li>${game.i18n.localize("es.category.wildboar")}</li>
          <li>${game.i18n.localize("es.category.wolf")}</li>
        </ul>
        ${game.i18n.localize("es.selectCategoryDescription2")} 
        <ul>
          <li><code>${tokenBasePath}</code></li>
        </ul>
        ${game.i18n.localize("es.selectCategoryDescription3")} 
        <br><label for="token-selector">${game.i18n.localize("es.selectCategory")}</label>
        <select id="token-selector">
          <option value="random">${game.i18n.localize("es.randomSelection")}</option>
          <option value="fighter">${game.i18n.localize("es.category.fighter")}</option>
          <option value="alligator">${game.i18n.localize("es.category.alligator")}</option>
          <option value="bear">${game.i18n.localize("es.category.bear")}</option>
          <option value="beetleswarm">${game.i18n.localize("es.category.beetleswarm")}</option>
          <option value="bedouin">${game.i18n.localize("es.category.bedouin")}</option>
          <option value="crap">${game.i18n.localize("es.category.crap")}</option>
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
      settingsTab.append(header + dropdown);

      const tokenContainer = settingsTab.find("#token-container");
      const tokenHeader = settingsTab.find("#token-header");

      getImagesForCategories().then(allImages => {
        function updateGallery(selection) {
          selection = selection.trim();

          if (allImages[selection] && allImages[selection].length > 0) {
            allImages[selection] = allImages[selection].sort(() => 0.5 - Math.random()).slice(0, 6);
            tokenHeader.text(`${game.i18n.localize("es.tokenSelection")} - ${game.i18n.localize(`es.category.${selection}`)}`);
            tokenContainer.html(createImageGallery(allImages[selection]));
          } else {
            tokenHeader.text(`${game.i18n.localize("es.tokenSelection")} - ${game.i18n.localize("es.randomSelection")}`);
            const randomImages = Object.values(allImages).flat().sort(() => 0.5 - Math.random()).slice(0, 6);
            tokenContainer.html(createImageGallery(randomImages));
          }
        }
        
        settingsTab.find("#token-selector").on("change", function () {
          updateGallery(this.value);
        });
        
        updateGallery("random");
      });
    } else {
      console.warn("[Ecosquirrel] Modul-Tab nicht gefunden! Ist der Modul-Name korrekt?");
    }
  });
});
