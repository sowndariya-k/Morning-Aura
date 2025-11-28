
        /* --- BACKGROUND --- */
       function initParticles() {
            const container = document.getElementById('particles');
            const icons = ['★', '✦', '•', '✨'];
            container.innerHTML = '';
            for(let i=0; i<30; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                p.innerText = icons[Math.floor(Math.random()*icons.length)];
                p.style.left = Math.random() * 100 + 'vw';
                p.style.animationDuration = (Math.random() * 20 + 10) + 's';
                p.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
                container.appendChild(p);
            }
        }

        /* --- STATE --- */
        const defaultData = {
            streak: 0,
            lastDate: null,
            dayStatus: { watered: false, loggedOut: false },
            tasks: [],
            seenQuotes: [],
            flowerMilestones: [] 
        };
        let appData = JSON.parse(localStorage.getItem('auraLoopFinalV1')) || defaultData;
        const today = new Date().toISOString().split('T')[0];
        let isUrgent = false;
        let isVital = false;
        // 100+ Unique Fortune Cookie Messages
        const fortuneDeck = [
            "Your energy today will attract amazing opportunities.", "You are exactly where you need to be to grow.",
            "Luck is favoring your bold actions today.", "A small step today will lead to a giant leap tomorrow.",
            "Focus on the solution, not the problem, and you will win.", "Your potential is limitless—tap into it now.",
            "Positive vibes are circulating around you today.", "Great things take time, but you are making progress.",
            "Today is a perfect day to start something new.", "Your hard work is about to pay off in unexpected ways.",
            "Trust your intuition; it is guiding you to success.", "Abundance is flowing into your life right now.",
            "You have the power to create the life you desire.", "Something wonderful is about to happen to you.",
            "Your positive attitude is your greatest asset today.", "Believe in yourself, and others will too.",
            "Every challenge is an opportunity in disguise.", "You are a magnet for good luck and prosperity.",
            "Your creativity is at an all-time high—use it!", "Kindness you show today will return to you tenfold.",
            "The universe is conspiring in your favor.", "Expect a pleasant surprise today.",
            "Your smile will brighten someone's day.", "Discipline is the bridge between goals and accomplishment.",
            "You are stronger than you think.", "Success is not final, failure is not fatal.",
            "Happiness is not something ready made. It comes from your own actions.", "The only way to do great work is to love what you do.",
            "Your vibe attracts your tribe.", "Dream big and dare to fail.", "Action is the foundational key to all success.",
            "Don't wait for opportunity. Create it.", "Your future is created by what you do today, not tomorrow.",
            "The best way to predict the future is to create it.", "You are capable of amazing things.",
            "Start where you are. Use what you have. Do what you can.", "Be the energy you want to attract.",
            "Your potential to succeed is infinite.", "Positivity is a choice that becomes a lifestyle.",
            "Today is a fresh start. Embrace it.", "Confidence comes from discipline and training.",
            "Focus on being productive instead of busy.", "Small progress is still progress.",
            "You are a work of art in progress.", "Let your light shine bright today.",
            "Good things come to those who hustle.", "Stay hungry, stay foolish.",
            "Your only limit is your mind.", "Excellence is not an act, but a habit.",
            "The harder you work for something, the greater you'll feel when you achieve it.",
            "Opportunities don't happen, you create them.", "It always seems impossible until it's done.",
            "Success is walking from failure to failure with no loss of enthusiasm.", "Don't count the days, make the days count.",
            "The secret of getting ahead is getting started.", "If you can dream it, you can do it.",
            "Turn your wounds into wisdom.", "Don't watch the clock; do what it does. Keep going.",
            "Keep your face always toward the sunshine—and shadows will fall behind you.", "What you get by achieving your goals is not as important as what you become.",
            "Believe you can and you're halfway there.", "Act as if what you do makes a difference. It does.",
            "Success usually comes to those who are too busy to be looking for it.", "Don't be afraid to give up the good to go for the great.",
            "I find that the harder I work, the more luck I seem to have.", "Success is not the key to happiness. Happiness is the key to success.",
            "If you really want to do something, you'll find a way. If you don't, you'll' find an excuse.", "I never dreamed about success. I worked for it.",
            "Success is not in what you have, but who you are.", "The only place where success comes before work is in the dictionary.",
            "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending.", "Tough times never last, but tough people do.",
            "You don't have to be great to start, but you have to start to be great.", "It does not matter how slowly you go as long as you do not stop.",
            "Everything you've ever wanted is on the other side of fear.", "Hardships often prepare ordinary people for an extraordinary destiny.",
            "Believe in your infinite potential. Your only limitations are those you set upon yourself.", "We generate fears while we sit. We overcome them by action.",
            "The only way to achieve the impossible is to believe it is possible.", "Don't let yesterday take up too much of today.",
            "You learn more from failure than from success. Don't let it stop you. Failure builds character.", "It's not whether you get knocked down, it's whether you get up.",
            "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", "People who are crazy enough to think they can change the world, are the ones who do.",
            "Failure will never overtake me if my determination to succeed is strong enough.", "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That's the classic entrepreneur.",
            "We may encounter many defeats but we must not be defeated.", "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
            "Imagine your life is perfect in every respect; what would it look like?", "Security is mostly a superstition. Life is either a daring adventure or nothing.",
            "The man who has confidence in himself gains the confidence of others.", "The only limit to our realization of tomorrow will be our doubts of today.",
            "Creativity is intelligence having fun.", "What you lack in talent can be made up with desire, hustle and giving 110% all the time.",
            "Do what you can with all you have, wherever you are.", "Develop an 'Attitude of Gratitude'. Say thank you to everyone you meet for everything they do for you.",
            "You are never too old to set another goal or to dream a new dream.", "To see what is right and not do it is a lack of courage.",
            "Reading is to the mind what exercise is to the body.", "Fake it until you make it! Act as if you had all the confidence you require until it becomes your reality.",
            "The future belongs to the competent. Get good, get better, be the best!", "For every reason it's not possible, there are hundreds of people who have faced the same circumstances and succeeded.",
            "Things work out best for those who make the best of how things work out.", "A room without books is like a body without a soul.",
            "I think goals should never be easy, they should force you to work, even if they are uncomfortable at the time.", "Today's accomplishments were yesterday's impossibilities.",
            "The only way to do great work is to love what you do.", "You don't have to be great to start, but you have to start to be great."
        ];

        /* --- INIT --- */
        document.addEventListener('DOMContentLoaded', () => {
            initParticles();
            initTheme();
            checkDay();
            document.getElementById('date-display').innerText = new Date().toDateString();
            renderTasks();
        });

        function checkDay() {
            if (appData.lastDate !== today) {

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    // ------ MISS STREAK CONDITION ------
    // If user did NOT logout yesterday → reset streak
    if (appData.lastDate === yStr && !appData.dayStatus.loggedOut) {
        appData.streak = 0;
        appData.flowerMilestones = [];
    }

    // If user skipped the day completely → reset streak
    if (appData.lastDate !== yStr && appData.lastDate !== null) {
        appData.streak = 0;
        appData.flowerMilestones = [];
    }

    // Reset day status for the new day
    appData.dayStatus = { watered: false, loggedOut: false };
    appData.lastDate = today;
    saveData();

    ensureFlowerMilestone(appData.streak);

    // ALWAYS open the plant page first every new day
    showPage('page-welcome');
    renderPlantVisuals(appData.streak);

} else {
                // Same Day
                if (appData.dayStatus.loggedOut) {
                    // Loop Mode
                    appData.dayStatus.watered = false;
                    appData.dayStatus.loggedOut = false;
                    showPage('page-welcome');
                    renderPlantVisuals(appData.streak);
                    
                    document.getElementById('btn-water').classList.remove('hidden');
                    document.getElementById('btn-enter').classList.add('hidden');
                    document.getElementById('guide-text').innerText = "Nurture your daily growth.";
                    document.getElementById('quote-area').classList.remove('visible');
                } else if (appData.dayStatus.watered) {
                    showPage('page-planner');
                } else {
                    showPage('page-welcome');
                    renderPlantVisuals(appData.streak);
                }
            }
            updateStreakUI();
        }

        function ensureFlowerMilestone(currentStreak) {
            const currentBlock = Math.floor(currentStreak / 10);
            const hasMilestone = appData.flowerMilestones.some(m => Math.floor(m/10) === currentBlock);
            
            if (!hasMilestone) {
                const min = currentBlock * 10 + 1;
                const max = (currentBlock + 1) * 10;
                const randomDay = Math.floor(Math.random() * (max - min + 1)) + min;
                appData.flowerMilestones.push(randomDay);
                saveData();
            }
        }

        /* --- PLANT ENGINE --- */
        function renderPlantVisuals(streakCount) {
            const plantStructure = document.getElementById('plant-structure');
            plantStructure.innerHTML = ''; 

            // 1. MAIN STEM (Days 1-10)
            const mainStem = document.createElement('div');
            mainStem.className = 'main-stem';
            let mainHeight = Math.min(streakCount * 25, 250);
            if(streakCount === 0) mainHeight = 0;
            if(streakCount > 0 && mainHeight < 40) mainHeight = 40;
            if(streakCount > 10) mainHeight = 250; 
            
            mainStem.style.height = mainHeight + 'px';
            plantStructure.appendChild(mainStem);

            // 2. MAIN STEM LEAVES
            const mainLeafCount = Math.min(streakCount, 10);
            for(let i=0; i<mainLeafCount; i++) {
                const dayVal = i + 1;
                if (appData.flowerMilestones.includes(dayVal)) {
                    addFlowerToContainer(plantStructure, i, false, 0);
                } else {
                    addLeafToContainer(plantStructure, i, false, 0);
                }
            }

            // 3. BRANCHING (Days 11+)
            if (streakCount > 10) {
                const branchDays = streakCount - 10;
                const numBranches = Math.ceil(branchDays / 10); 
                
                for (let b = 0; b < numBranches; b++) {
                    const branchStartDay = b * 10;
                    const daysIntoBranch = branchDays - branchStartDay;
                    // First day of branch cycle (11, 21...) is Branch Growing
                    // Leaves start on day 2 of cycle (12, 22...)
                    const leafCountOnBranch = Math.max(0, daysIntoBranch - 1);

                    createBranch(plantStructure, b, leafCountOnBranch, streakCount);
                }
            }
        }

        function createBranch(container, branchIndex, leafCount, totalStreak) {
            const branch = document.createElement('div');
            branch.className = 'branch';
            
            const isLeft = branchIndex % 2 !== 0;
            const bottomOffset = 100 + (branchIndex * 60); 
            
            branch.style.bottom = `${bottomOffset}px`;
            branch.style.left = '50%';
            
            // Length calculation
            let length = Math.min(20 + leafCount * 20, 140);
            // if daysIntoBranch is 1 (branch start day), show small branch
            if(leafCount === 0) length = 40; 
            
            branch.style.height = `${length}px`;
            branch.style.transform = isLeft ? 'rotate(-45deg)' : 'rotate(45deg)';
            
            container.appendChild(branch);

            // Base streak for this branch (e.g. 11)
            const branchBaseStreak = 10 + (branchIndex * 10);

            // Iterate leaves. Note: i is 0-based index of leaf on branch.
            // Leaf 0 appears on Day 12 (Streak 12). 
            // Streak = base + 1 (branch day) + i + 1 (leaf day).
            for(let i=0; i<leafCount; i++) {
                const currentStreakVal = branchBaseStreak + 1 + i + 1;
                const isFlower = appData.flowerMilestones.includes(currentStreakVal);

                if (isFlower) {
                    addFlowerToBranch(container, i, isLeft, bottomOffset, length);
                } else {
                    addLeafToBranch(container, i, isLeft, bottomOffset, length);
                }
            }
        }

       function addFlowerToContainer(container, index, isBranch, bottomOffset) {
    const stalk = document.createElement('div');
    stalk.className = 'flower-stalk';
    stalk.style.width = '40px';

    const bottomPos = (index * 25) + 15 + bottomOffset; 
    stalk.style.bottom = `${bottomPos}px`;
    stalk.style.left = '50%';

    const flower = document.createElement('div');
    flower.className = 'flower';

    // Flower attaches at end of stalk
    flower.style.left = '100%';
    flower.style.top = '-25px';

   if (index % 2 === 0) { 
    flower.classList.add('flower-left');
} else { 
    flower.classList.add('flower-right');
}


    stalk.appendChild(flower);
    container.appendChild(stalk);
}


function addLeafToContainer(container, index, isBranch, bottomOffset) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    const bottomPos = (index * 25) + 15 + bottomOffset; 
    leaf.style.bottom = `${bottomPos}px`;

    if (index % 2 === 0) { 
        leaf.classList.add('leaf-left');
    } else { 
        leaf.classList.add('leaf-right');
    }
    leaf.style.opacity = 1; 
    container.appendChild(leaf);
}


function addFlowerToBranch(container, index, isBranchLeft, branchBottom, branchLen) {

    const stalk = document.createElement('div');
    stalk.className = 'flower-stalk';
    stalk.style.width = '30px';

    const distUpBranch = (index * 15) + 20; 
    const rad = 45 * (Math.PI / 180);
    const xDist = distUpBranch * Math.sin(rad);
    const yDist = distUpBranch * Math.cos(rad);
    const actualBottom = branchBottom + yDist;

    stalk.style.bottom = `${actualBottom}px`;

    const flower = document.createElement('div');
    flower.className = 'flower';

    // Position relative to stalk tip
    flower.style.left = '100%';
    flower.style.top = '-12px';

   if (isBranchLeft) {
    flower.classList.add('flower-left');
} else {
    flower.classList.add('flower-right');
}


    stalk.appendChild(flower);
    container.appendChild(stalk);
}

        function addLeafToBranch(container, index, isBranchLeft, branchBottom, branchLen) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            const distUpBranch = (index * 15) + 20; 
            const rad = 45 * (Math.PI / 180);
            const xDist = distUpBranch * Math.sin(rad);
            const yDist = distUpBranch * Math.cos(rad);
            const actualBottom = branchBottom + yDist;
            
            leaf.style.bottom = `${actualBottom}px`;
            
            if (isBranchLeft) {
                leaf.style.left = `calc(50% - ${xDist}px)`;
                if (index % 2 === 0) {
                    leaf.style.marginLeft = '-45px'; 
                    leaf.style.transform = 'scaleX(-1) rotate(-15deg)'; 
                } else {
                    leaf.style.marginLeft = '-10px';
                    leaf.style.transform = 'rotate(-75deg)'; 
                }
            } else {
                leaf.style.left = `calc(50% + ${xDist}px)`;
                if (index % 2 === 0) {
                    leaf.style.marginLeft = '0px'; 
                    leaf.style.transform = 'rotate(15deg)'; 
                } else {
                    leaf.style.marginLeft = '-45px';
                    leaf.style.transform = 'scaleX(-1) rotate(75deg)'; 
                }
            }
            leaf.style.opacity = 1;
            container.appendChild(leaf);
        }

        /* --- ACTIONS --- */
        async function waterPlant() {
            const can = document.getElementById('water-bottle-wrap');
            const btn = document.getElementById('btn-water');
            const txt = document.getElementById('guide-text');

            can.classList.add('active');
            btn.classList.add('hidden');
            
            setTimeout(() => can.classList.add('pouring'), 100);

            // 1. Update State & Visuals (Grow Leaf) at 1.5s
            setTimeout(async () => {
                appData.streak++;
                appData.dayStatus.watered = true;
                
                // Pre-calculate future flower
                ensureFlowerMilestone(appData.streak);
                
                saveData();
                updateStreakUI();
                
                // Re-render whole plant
                renderPlantVisuals(appData.streak);

                await fetchUniqueFortune();
                
                // 2. Stop Watering shortly AFTER leaf appears (e.g. +800ms)
                setTimeout(() => {
                    can.classList.remove('pouring');
                    can.classList.remove('active');
                    
                    // 3. Show Buttons & Quote AFTER water stops
                    document.getElementById('btn-enter').classList.remove('hidden');
                    document.getElementById('quote-area').classList.add('visible');
                    txt.innerText = "Growth achieved.";
                }, 800);

            }, 1500);
        }

        async function fetchUniqueFortune() {
            const t = document.getElementById('quote-txt');
            const a = document.getElementById('quote-by');
            
            let message = "";
            let author = "Fortune";
            let foundUnique = false;

            const unusedDeck = fortuneDeck.filter(q => !appData.seenQuotes.includes(q));
            
            if (!foundUnique) {
                try {
                    const res = await fetch('https://api.quotable.io/random?tags=inspirational|success');
                    const data = await res.json();
                    if (!appData.seenQuotes.includes(data.content)) {
                        message = data.content;
                        author = data.author;
                        foundUnique = true;
                    }
                } catch(e) { }
            }

            if (!foundUnique) {
                if (unusedDeck.length > 0) {
                    message = unusedDeck[Math.floor(Math.random() * unusedDeck.length)];
                } else {
                    message = fortuneDeck[Math.floor(Math.random() * fortuneDeck.length)];
                }
            }

            appData.seenQuotes.push(message);
            saveData();

            t.innerText = `"${message}"`;
            a.innerText = `- ${author}`;
        }

        /* --- PLANNER --- */
        function enterPlanner() {
            showPage('page-planner');
            document.getElementById('page-planner').style.display = 'flex';
        }

        function toggleSwitch(type) {
            if(type === 'urgent') {
                isUrgent = !isUrgent;
                const el = document.getElementById('tg-urgent');
                isUrgent ? el.classList.add('active') : el.classList.remove('active');
            } else {
                isVital = !isVital;
                const el = document.getElementById('tg-vital');
                isVital ? el.classList.add('active') : el.classList.remove('active');
            }
        }

        function addNewTask() {
            const name = document.getElementById('inp-task').value;
            const time = document.getElementById('inp-time').value;
            if(!name) return;

            appData.tasks.push({
                id: Date.now(), name, time: time || 0,
                urgent: isUrgent, important: isVital
            });
            
            document.getElementById('inp-task').value = '';
            document.getElementById('inp-time').value = '';
            saveData(); renderTasks();
        }

        function renderTasks() {
            ['q1','q2','q3','q4','agenda-list'].forEach(id => document.getElementById(id).innerHTML = '');
            
            const q1 = appData.tasks.filter(t => t.urgent && t.important);
            const q2 = appData.tasks.filter(t => !t.urgent && t.important);
            const q3 = appData.tasks.filter(t => t.urgent && !t.important);
            const q4 = appData.tasks.filter(t => !t.urgent && !t.important);

            const makeCard = (t, dest) => {
                const d = document.createElement('div');
                d.className = 'task-item';
                d.innerHTML = `
                    <div><strong>${t.name}</strong> <small style="opacity:0.6; margin-left:8px;">${t.time}m</small></div>
                    <i class="fas fa-trash" style="color:#f87171; cursor:pointer;" onclick="delTask(${t.id})"></i>
                `;
                document.getElementById(dest).appendChild(d);
            };

            q1.forEach(t => makeCard(t, 'q1'));
            q2.forEach(t => makeCard(t, 'q2'));
            q3.forEach(t => makeCard(t, 'q3'));
            q4.forEach(t => makeCard(t, 'q4'));

            const all = [...q1, ...q2, ...q3, ...q4];
            all.forEach((t, i) => {
                const d = document.createElement('div');
                d.className = 'task-item';
                d.style.borderLeft = 'none';
                d.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                d.innerHTML = `<span style="color:var(--accent); font-weight:800; margin-right:10px;">${i+1}.</span> ${t.name}`;
                document.getElementById('agenda-list').appendChild(d);
            });
        }

        function delTask(id) {
            appData.tasks = appData.tasks.filter(t => t.id !== id);
            saveData(); renderTasks();
        }

        /* --- LOGOUT FLOW --- */
        function showLogoutModal() { document.getElementById('logout-modal').classList.remove('hidden'); }
        function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
        function confirmLogout() {
            appData.dayStatus.loggedOut = true;
            saveData();
            closeModal('logout-modal');
            showPage('page-summary');
            setTimeout(() => {
                appData.dayStatus.watered = false;
                appData.dayStatus.loggedOut = false;
                appData.tasks = []; 
                saveData();
                
                document.getElementById('btn-water').classList.remove('hidden');
                document.getElementById('btn-enter').classList.add('hidden');
                document.getElementById('guide-text').innerText = "Nurture your daily growth.";
                document.getElementById('quote-area').classList.remove('visible');
                
                checkDay(); 
            }, 2000);
        }

        function showPage(id) {
            document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
            document.getElementById(id).classList.remove('hidden');
        }
       function saveData() { localStorage.setItem('auraLoopFinalV1', JSON.stringify(appData)); }
        function updateStreakUI() { document.getElementById('streak-counter').innerText = `${appData.streak} Days`; }
        function initTheme() { if(localStorage.getItem('theme') === 'light') document.body.classList.add('light'); }
        function toggleTheme() {
            document.body.classList.toggle('light');
            localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
        }