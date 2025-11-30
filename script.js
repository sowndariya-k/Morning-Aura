
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
            // For main stem (days 1-10), ensure 1 flower
            if (currentStreak > 0 && currentStreak <= 10) {
                const hasMilestone = appData.flowerMilestones.some(m => m > 0 && m <= 10);
                if (!hasMilestone) {
                    const randomDay = Math.floor(Math.random() * 10) + 1;
                    appData.flowerMilestones.push(randomDay);
                }
            } 
            // For branches, ensure 2 flowers per 11-day cycle
            else if (currentStreak > 10) {
                const branchDays = currentStreak - 10; // Days past the main stem
                const currentBlock = Math.floor((branchDays - 1) / 9); // 0-indexed branch block (9 items per branch)
                const min = 11 + (currentBlock * 9); // Start day of the block
                const max = min + 8; // End day of the block (9 days total)

                const milestonesInBlock = appData.flowerMilestones.filter(m => m >= min && m <= max).length;

                // Add flowers until there are 2 in the current 9-day block
                for (let i = milestonesInBlock; i < 2; i++) {
                    let randomDay;
                    do {
                        randomDay = Math.floor(Math.random() * (max - min + 1)) + min;
                    } while (appData.flowerMilestones.includes(randomDay)); // Ensure it's unique
                    appData.flowerMilestones.push(randomDay);
                }
            }
            saveData();
        }

        /* --- PLANT ENGINE --- */
        function renderPlantVisuals(streakCount) {
            const plantStructure = document.getElementById('plant-structure');
            const plantStage = document.querySelector('.plant-stage');
            const welcomePage = document.getElementById('page-welcome');
            plantStructure.innerHTML = ''; 

            // 1. MAIN STEM
            const mainStem = document.createElement('div'); 
            mainStem.className = 'main-stem';

            // Calculate required stem height
            const baseStemHeight = 300; // Height after first 10 days
            let requiredHeight = baseStemHeight;
            if (streakCount > 10) {
                const numBranches = Math.ceil((streakCount - 10) / 9);
                // Required height is the position of the highest branch + some padding
                requiredHeight = 100 + ((numBranches - 1) * 70) + 50;
            }
            let mainHeight = Math.max(40, Math.min(streakCount * 30, requiredHeight));
            if (streakCount === 0) mainHeight = 0;

            mainStem.style.height = mainHeight + 'px';
            plantStructure.appendChild(mainStem);

            // --- Responsive Scaling Logic ---
            const baseStageHeight = 450;
            const newStageHeight = Math.max(baseStageHeight, mainHeight + 150);
            plantStage.style.height = `${newStageHeight}px`;

            // As the stage gets taller, calculate a scale factor to keep the plant in view.
            // This will scale the plant down when its container grows very large.
            const scaleFactor = Math.min(1, baseStageHeight / (newStageHeight - 150));
            plantStage.style.setProperty('--plant-scale', scaleFactor);

            welcomePage.style.justifyContent = newStageHeight > baseStageHeight ? 'flex-start' : 'center';

            // 2. MAIN STEM LEAVES
            const mainLeafCount = Math.min(streakCount, 10); // 10 items on the main stem
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
                const branchDays = streakCount - 10; // How many days past the main stem
                const numBranches = Math.ceil(branchDays / 9); // Each branch cycle is 9 days (7 leaves, 2 flowers)
                
                for (let b = 0; b < numBranches; b++) {
                    const branchStartDay = b * 9;
                    const daysIntoBranch = branchDays - branchStartDay;
                    // A new leaf/flower should grow with the branch. Cap at 9 items per branch.
                    const leafCountOnBranch = Math.max(0, Math.min(daysIntoBranch, 9));
                    createBranch(plantStructure, b, leafCountOnBranch, streakCount);
                }
            }
        }

        function createBranch(container, branchIndex, leafCount, totalStreak) {
            const branch = document.createElement('div');
            branch.className = 'branch';
            
            const isLeft = branchIndex % 2 !== 0;
            const bottomOffset = 100 + (branchIndex * 70); 
            if (isLeft) {
                branch.classList.add('left-branch');
            }
            
            branch.style.bottom = `${bottomOffset}px`;
            branch.style.left = '50%';
            
            // Length calculation
            // A full branch has 9 items.
            const maxLength = 320; // Increase max branch length to give more room
            let length = 40 + ((leafCount - 1) * (maxLength - 40) / 8); // Grow from 40 to 320 over 9 items. (leafCount-1)/8 ensures it reaches max length on the 9th item.
            branch.style.height = `${length}px`;
            branch.style.transform = isLeft ? 'rotate(-45deg)' : 'rotate(45deg)';
            
            container.appendChild(branch);

            // Base streak for this branch (e.g., 11 for the first branch)
            const branchBaseStreak = 10 + (branchIndex * 9);

            // Iterate leaves. Note: i is 0-based index of leaf on branch.
            // Leaf 0 appears on Day 12 (Streak 12). 
            // Streak = base + 1 (branch day) + i + 1 (leaf day).
            for(let i=0; i<leafCount; i++) {
                const currentStreakVal = branchBaseStreak + i + 1;
                const isFlower = appData.flowerMilestones.includes(currentStreakVal) && i < 9; // Ensure flowers don't replace leaves

                if (isFlower) {
                    addFlowerToBranch(container, i, isLeft, bottomOffset, length);
                } else {
                    addLeafToBranch(container, i, isLeft, bottomOffset, length);
                }
            }
        }

       function addFlowerToContainer(container, index, isBranch, bottomOffset) {
    const stalk = document.createElement('div');
    stalk.className = 'flower-stalk fade-in';

    const bottomPos = (index * 30) + 20 + bottomOffset; // Increased spacing
    stalk.style.bottom = `${bottomPos}px`;

    const flower = document.createElement('div');
    flower.className = 'flower';

    if (index % 2 === 0) { 
        stalk.classList.add('flower-left');
        // The flower inside will be flipped by the parent's transform
    } else { 
        stalk.classList.add('flower-right');
    }
    
    // The flower itself is positioned at the tip of the stalk via CSS
    // It will inherit the correct orientation from its parent stalk

    stalk.appendChild(flower);
    container.appendChild(stalk);
}


function addLeafToContainer(container, index, isBranch, bottomOffset) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf-on-stem'; // Use a specific class for stem leaves
    const bottomPos = (index * 30) + 20 + bottomOffset; // Increased spacing
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
    // Create a single element for the flower on the branch, just like a leaf
    const flower = document.createElement('div');
    flower.className = 'flower-on-branch'; // Use a new, specific class

    // --- THIS LOGIC IS NOW IDENTICAL TO addLeafToBranch ---

    // Position flower along the branch
    const branchItemOffset = 50; // Start items further up the branch
    const distUpBranch = branchItemOffset + (branchLen - branchItemOffset) / 9 * index;

    const sideSign = index % 2 === 0 ? 1 : -1; // 1 for outer, -1 for inner

    const branchAngleRad = isBranchLeft ? -45 * (Math.PI / 180) : 45 * (Math.PI / 180);

    const xPos = distUpBranch * Math.sin(branchAngleRad);
    const yPos = distUpBranch * Math.cos(branchAngleRad);

    flower.style.left = `calc(50% + ${xPos}px - 22px)`; // Center the flower (width 45px)
    flower.style.bottom = `${branchBottom + yPos}px`;

    const flowerAngle = (isBranchLeft ? -45 : 45) + (sideSign * 90);
    flower.style.transform = `rotate(${flowerAngle}deg)`;

    flower.style.opacity = 1; // Make it visible
    container.appendChild(flower);
}

        function addLeafToBranch(container, index, isBranchLeft, branchBottom, branchLen) {
            const leaf = document.createElement('div');
            // Use a new class to avoid conflicts with main stem leaf styles
            leaf.className = 'leaf-on-branch'; 
 
            // Position leaf along the branch
            const branchItemOffset = 50; // Start items further up the branch
            const distUpBranch = branchItemOffset + (branchLen - branchItemOffset) / 9 * index;
 
            // Determine which side of the branch to grow on
            const sideSign = index % 2 === 0 ? 1 : -1; // 1 for outer, -1 for inner

            const branchAngleRad = isBranchLeft ? -45 * (Math.PI / 180) : 45 * (Math.PI / 180);

            // Calculate the leaf's base position along the branch
            const xPos = distUpBranch * Math.sin(branchAngleRad);
            const yPos = distUpBranch * Math.cos(branchAngleRad);

            // Position the leaf's pivot point ON the branch
            const leafX = `calc(50% + ${xPos}px - 22px)`; // Center the leaf (width 50px) on its calculated X position
            const leafY = `${branchBottom + yPos}px`;

            leaf.style.left = leafX;
            leaf.style.bottom = leafY; // Set the leaf's pivot point (bottom center) directly on the branch line

            // Rotate the leaf OUT from the branch.
            const leafAngle = (isBranchLeft ? -45 : 45) + (sideSign * 90);
            leaf.style.transform = `rotate(${leafAngle}deg)`;

            leaf.style.opacity = 1; // Make it visible
            container.appendChild(leaf);
        }

        /* --- ACTIONS --- */
        async function waterPlant() {
    const can = document.getElementById('water-bottle-wrap');
    const btn = document.getElementById('btn-water');
    const txt = document.getElementById('guide-text');

    can.classList.add('active');
    btn.classList.add('hidden');
    
    setTimeout(() => can.classList.add('pouring'), 300);

   setTimeout(async () => {

    appData.streak++;
    appData.dayStatus.watered = true;
    ensureFlowerMilestone(appData.streak);
    saveData();
    updateStreakUI();
    renderPlantVisuals(appData.streak);

    // Stop animation immediately
    can.classList.remove('pouring');
    can.classList.remove('active');

    // Show buttons and quote immediately
    document.getElementById('btn-enter').classList.remove('hidden');
    document.getElementById('quote-area').classList.add('visible');
    txt.innerText = "Growth achieved.";

    // Fetch quote without waiting for animation
    fetchUniqueFortune();

}, 3000); // shorter delay just for smooth UI (optional)
        }

        async function fetchUniqueFortune() {
    const t = document.getElementById('quote-txt');
    const a = document.getElementById('quote-by');

    // --- 1. Instant message from offline deck ---
    let fallbackQuote = "";
    const unusedDeck = fortuneDeck.filter(q => !appData.seenQuotes.includes(q));

    if (unusedDeck.length > 0) {
        fallbackQuote = unusedDeck[Math.floor(Math.random() * unusedDeck.length)];
    } else {
        // If user saw all, recycle
        fallbackQuote = fortuneDeck[Math.floor(Math.random() * fortuneDeck.length)];
    }

    t.innerText = `"${fallbackQuote}"`;
    a.innerText = "- Fortune";

    // Save fallback (temporary)
    appData.seenQuotes.push(fallbackQuote);
    saveData();

    // --- 2. Fetch API in background (no waiting UI) ---
    try {
        const res = await fetch("https://api.quotable.io/random?tags=inspirational|success");
        const data = await res.json();

        if (data && data.content && !appData.seenQuotes.includes(data.content)) {
            // Replace UI text with API result
            t.innerText = `"${data.content}"`;
            a.innerText = `- ${data.author}`;

            // Replace fallback in storage with real quote
            appData.seenQuotes.pop(); 
            appData.seenQuotes.push(data.content);
            saveData();
        }

    } catch (err) {
        console.warn("API fetch failed → fallback used.");
    }

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