const countryCodes = {
    FR: "France",
    US: "United States",
    CN: "China",
    CA: "Canada",
    DE: "Germany",
    GB: "Great Britain",
    JP: "Japan",
    MX: "Mexico",
    IN: "India",
    AU: "Australia",
};

const cityObject = {
    Paris: {
        population: '2.16 Million',
        bio: 'The capital of France and a major European city due to it serving as a global center for art, fashion, gastronomy and culture. It is also the city that houses many famous landmarks such as the Eiffel Tower and Nortre-Dame Cathedral.',
        image: 'https://images.unsplash.com/photo-1568684333877-4d39f2c871c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

    },
    Toulouse: {
        population: '1.05 Million',
        bio: 'Though it is the fourth largest city in France, Toulouse houses the largest center for Aerospace in all of Europe due to the city being the European headquarters of airplane manufacturer Airbus, and the French Space Agency.',
        image: 'https://images.unsplash.com/photo-1559008781-359bc968d86e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG91bG91c2V8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    },
    London: {
        population: '9.541 Million',
        bio: 'The capital of not just Great Britain, but the United Kingdom as a whole. In addition, the city contains history going back to the Roman Empire. It houses many different tourist landmarks such as the House of Parliament, Westminster Abbey, and the famous "Big Ben" clock tower.',
        image: 'https://images.unsplash.com/photo-1545073334-9cb53498f1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    Inverness: {
        population: '47,009',
        bio: 'While the population may be small and the city resides in the country of Scotland, the population has seen an increase in population over the last few years due to the increase in several sectors such as energy, construction, life sciences, and tourism.',
        image: 'https://images.unsplash.com/photo-1660511922635-72128ae7caad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGludmVybmVzc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=600&q=60'
    },
    Beijing: {
        population: '21.333 Million',
        bio: 'Beside being the capital of China, this city is well known for its opulent palaces, temples, parks, gardens, tombs, walls and gates. In addition, this city is one of the most popular tourist destinations in the world.',
        image: 'https://images.unsplash.com/photo-1603258740665-711401f368bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    Xinxiang: {
        population: '25.890 Million',
        bio: 'Located in the northern Henan province, this city is a key location for trading because of its location, where the Yongji Canal joins the Wei River to the Huang He (Yellow River), thus affording a transport route from the Huang He valley to northern Hebei.',
        image: 'https://static.dezeen.com/uploads/2022/02/ice-cubes-mathieu-forest-architecte-china-cultural-buildings_dezeen_2364_col_14-scaled.jpg'
    },
    Tokyo: {
        population: '37.274 Million',
        bio: 'The capital of Japan which houses several towering skyscrapers along with several historical locations with one being the Imperial Palace. This city also contains several gardens and musems of different varieties.',
        image: 'https://images.unsplash.com/photo-1582546338780-c9889634b3d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
    },
    Kyoto: {
        population: '1.463 Million',
        bio: 'The previous capital of Japan, this city is located on the island of Honshu and is very popular for its many classical Buddhist temples, gardens, palaces, shrines, and the traditional wooden homes. This is further captured by the image to the left!',
        image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    Toronto: {
        population: '6.313 Million',
        bio: 'The capital of Canada which is located next to Lake Ontario. Along with the many skyscrapers, this city contains several green spaces such as Queen\'s Park, High Park and its trails, sports facilities and a zoo.',
        image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
    },
    Vancouver: {
        population: '2.632 Million',
        bio: 'Along with being Canada\'s third largest city (as of 2021), the city also houses a very ethically and linguistically diverse population. The city is also ranked as one of the most livable cities in the world and it currently aims to be the greenest city in the world! ',
        image: 'https://images.unsplash.com/photo-1647655806907-caaf166360dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
    },
    Dallas: {
        population: '1.308 Million',
        bio: 'The third largest city in the state of Texas and home to cultural, and historical attractions such as the Sixth Floor Museum, the Dallas Museum of Arts, and home to the Dallas Mavericks basketball team.',
        image: 'https://images.unsplash.com/photo-1640666793260-d5f87802560b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRhbGxhcyUyMHRleGFzfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=600&q=60'
    },
    'New Orleans': {
        population: '1.005 Million',
        bio: 'Located on the Mississippi River and bordering the Gulf of Mexico, this city is famous for the round-the-clock nightlife, vibrant live-music scene and spicy, singular cuisine. This city has also been the victim of increasing Hurricane storms with one of the most memorable being Hurricane Katrina.',
        image: 'https://images.unsplash.com/photo-1553150220-3bf6ec44f056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    Berlin: {
        population: '3.571 Million',
        bio: 'The capital of Germany dating back to the 13th century with reminders to the turbulent history of the country in the 20th century. These reminders include its Holocaust memorial and the Berlin Wall\'s graffitied remains. The city is also home to many memorable landmarks such as the Brandenburg Gate.',
        image: 'https://images.unsplash.com/photo-1549569344-5fab90429fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    Frankfurt: {
        population: '791,000',
        bio: 'A central city that is next to the river Main and is a large financial hub as it is also home to the European Central Bank. The city is also well known for hosting its annual Christmas Market.',
        image: 'https://images.unsplash.com/photo-1546244964-65f4072c0915?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
    },
    Delhi: {
        population: '32.066 Million',
        bio: 'The main capital territory of India located in the northern region of the country. This territory includes Old Delhi which is a neighborhood dating back to the 1600s.',
        image: 'https://images.unsplash.com/photo-1575566668200-7dcaa7b2cf28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    Hapur: {
        population: '334,000',
        bio: 'Located east of New Delhi, this city is noted as a manufacturing hub of making Stainless Steel Pipes and Tubes. ',
        image: 'https://images.unsplash.com/photo-1600317055848-1a78a8bf2fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    },
    'Mexico City': {
        population: '22.085 Million',
        bio: 'Capital to the country of Mexico, this city is also listed as the most populous city in North America. The city is also home to many famous landmarks such as the Templo Mayor (a 13th-century Aztec temple), the baroque Catedral Metropolitana de México of the Spanish conquistadors and the Palacio Nacional, which houses historic murals by Diego Rivera.',
        image: 'https://images.unsplash.com/photo-1624924260914-fb20a872d4ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    Aguascalientes: {
        population: '1.143 Million',
        bio: 'Located in central Mexico, this city is known for the Spanish colonial buildings in its historic center such as the 17th-century Government Palace which is known for its many carved interior arches.',
        image: 'https://images.unsplash.com/photo-1606244299183-1734fe9aa9ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    Sydney: {
        population: '5.231 Million (2021)',
        bio: 'Capital of New South Wales and one of Australia\'s largest cities. It is also home to the Sydney Opera House which sits next to Darling Harbour.',
        image: 'https://images.unsplash.com/photo-1590716209211-ea74d5f63573?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    },
    Perth: {
        population: '2.192 Million (2021)',
        bio: 'Located in western Australia, this city sits where the Swan River meets the southwest coast. Besides the many beaches, the city also contains Kings Park and the Botanic Garden on Mount Eliza which offers a fantastic view of the city.',
        image: 'https://images.unsplash.com/photo-1590418392936-a55fb981d784?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    }
}

export { cityObject, countryCodes };