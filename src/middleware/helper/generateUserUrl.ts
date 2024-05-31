import { logger } from '../../logger/loggers';

interface UserUrlPart {
    text: string,
    syllables: number
}

interface UserUrlNoun extends UserUrlPart {
    prefix?: "a"|"an"|"the"|"some",
    plural?: string
    pluralSyllables?: number
}

const adjectives: UserUrlPart[] = [
    {text: "silly", syllables: 2},
    {text: "goofy", syllables: 2},
    {text: "foolish", syllables: 2},
    {text: "stupid", syllables: 2},
    {text: "smart", syllables: 1},
    {text: "clever", syllables: 2},
    {text: "reckless", syllables: 2},
    {text: "mindless", syllables: 2},
    {text: "gifted", syllables: 2},

    {text: "silent", syllables: 2},
    {text: "quiet", syllables: 2},
    {text: "vocal", syllables: 2},
    {text: "loud", syllables: 1},

    {text: "dying", syllables: 2},
    {text: "singing", syllables: 2},
    {text: "storming", syllables: 2},
    {text: "laughing", syllables: 2},
    {text: "lagging", syllables: 2},
    {text: "squealing", syllables: 2},

    {text: "lucky", syllables: 2},
    {text: "sucky", syllables: 2},

    {text: "depressed", syllables: 2},
    {text: "angry", syllables: 2},
    {text: "angy", syllables: 2},
    {text: "anxious", syllables: 2},
    {text: "happy", syllables: 2},
    {text: "sad", syllables: 1},
    {text: "hungry", syllables: 2},
    {text: "starving", syllables: 2},

    {text: "cute", syllables: 1},
    {text: "pretty", syllables: 2},
    {text: "hot", syllables: 1},
    {text: "handsome", syllables: 2},
    {text: "precious", syllables: 2},
    {text: "friendly", syllables: 2},
    {text: "mean", syllables: 1},

    {text: "ugly", syllables: 2},

    {text: "little", syllables: 2},
    {text: "big", syllables: 1},
    {text: "large", syllables: 1},
    {text: "small", syllables: 1},
    {text: "huge", syllables: 1},
    {text: "massive", syllables: 2},
    {text: "tiny", syllables: 2},
    {text: "heavy", syllables: 2},
    {text: "soft", syllables: 1},
    {text: "fluffy", syllables: 2},
    {text: "smooth", syllables: 1},
    {text: "solid", syllables: 2},
    {text: "liquid", syllables: 2},
    {text: "bouncy", syllables: 2},
    {text: "sturdy", syllables: 2},
    {text: "strong", syllables: 1},
    {text: "weak", syllables: 1},

    {text: "neon", syllables: 2},
    {text: "rainbow", syllables: 2},
    {text: "grayscale", syllables: 2},
    {text: "gray", syllables: 1},
    {text: "dark gray", syllables: 2},
    {text: "light gray", syllables: 2},
    {text: "red", syllables: 1},
    {text: "maroon", syllables: 2},
    {text: "orange", syllables: 2},
    {text: "yellow", syllables: 2},
    {text: "green", syllables: 1},
    {text: "dark green", syllables: 2},
    {text: "light green", syllables: 2},
    {text: "lime green", syllables: 2},
    {text: "blue", syllables: 1},
    {text: "dark blue", syllables: 2},
    {text: "light blue", syllables: 2},
    {text: "cyan", syllables: 2},
    {text: "aqua", syllables: 2},
    {text: "purple", syllables: 2},
    {text: "pink", syllables: 1},

    {text: "rich", syllables: 1},
    {text: "poor", syllables: 1},
    {text: "broken", syllables: 2},
    {text: "drunken", syllables: 2},
    {text: "drunk", syllables: 1},
    {text: "awful", syllables: 2},
    {text: "fishy", syllables: 2},
    {text: "rabid", syllables: 2},
];

const nouns: UserUrlNoun[] = [
    {text: "monkey", syllables: 2},
    {text: "bunny", syllables: 2},
    {text: "rabbit", syllables: 2},
    {text: "puppy", syllables: 2},
    {text: "kitty", syllables: 2},
    {text: "raccoon", syllables: 2},
    {text: "tiger", syllables: 2},
    {text: "lion", syllables: 2},
    {text: "panda", syllables: 2},
    {text: "spider", syllables: 2},
    {text: "donkey", syllables: 2},
    {text: "beaver", syllables: 2},
    {text: "insect", syllables: 2},
    {text: "bobcat", syllables: 2},
    {text: "camel", syllables: 2},
    {text: "cheetah", syllables: 2},
    {text: "chicken", syllables: 2},
    {text: "cobra", syllables: 2},
    {text: "cricket", syllables: 2},
    {text: "blowfish", syllables: 2},
    {text: "dolphin", syllables: 2},
    {text: "dragon", syllables: 2},
    {text: "eagle", syllables: 2},
    {text: "birdie", syllables: 2},
    {text: "ferret", syllables: 2},
    {text: "fishy", syllables: 2},
    {text: "froggie", syllables: 2},
    {text: "gecko", syllables: 2},
    {text: "lizard", syllables: 2},
    {text: "lizard", syllables: 2},
    {text: "giraffe", syllables: 2},
    {text: "hamster", syllables: 2},
    {text: "human", syllables: 2},
    {text: "llama", syllables: 2},
    {text: "lobster", syllables: 2},
    {text: "mongoose", syllables: 2},
    {text: "parrot", syllables: 2},
    {text: "penguin", syllables: 2},
    {text: "piggy", syllables: 2},
    {text: "squirrel", syllables: 2},
    {text: "starfish", syllables: 2},
    {text: "stingray", syllables: 2},
    {text: "turtle", syllables: 2},
    {text: "walrus", syllables: 2},
    {text: "weasel", syllables: 2},
    {text: "marten", syllables: 2},
    {text: "zebra", syllables: 2},

    {text: "robot", syllables: 2},
    {text: "roomba", syllables: 2},
];

const verbs: UserUrlPart[] = [
    {text: "sings a song", syllables: 3},
    {text: "beeps a tone", syllables: 3},
    {text: "on the run", syllables: 3},

    {text: "eats", syllables: 1},
    {text: "steals", syllables: 1},
    {text: "blows", syllables: 1},
    {text: "has", syllables: 1},
    {text: "wants", syllables: 1},
    {text: "gifts", syllables: 1},
    {text: "gives", syllables: 1},
    {text: "grabs", syllables: 1},
    {text: "cures", syllables: 1},
    {text: "knows", syllables: 1},
    {text: "hides", syllables: 1},
    {text: "hears", syllables: 1},
    {text: "sees", syllables: 1},
    {text: "fears", syllables: 1},
    {text: "likes", syllables: 1},
    {text: "loves", syllables: 1},
    {text: "meets", syllables: 1},
    {text: "misses", syllables: 2},
    {text: "picks", syllables: 1},
    {text: "seeks", syllables: 1},
    {text: "gets", syllables: 1},

    {text: "hits", syllables: 1},
    {text: "kicks", syllables: 1},
    {text: "bangs", syllables: 1},
    {text: "slaps", syllables: 1},
    {text: "throws", syllables: 1},
    {text: "bites", syllables: 1},
    {text: "chews", syllables: 1},
    {text: "boops", syllables: 1},
    {text: "pokes", syllables: 1},
    {text: "pings", syllables: 1},
    {text: "chops", syllables: 1},
    {text: "kills", syllables: 1},
    {text: "breaks", syllables: 1},
    {text: "jumps", syllables: 1},
    {text: "hurts", syllables: 1},
    {text: "stabs", syllables: 1},
    {text: "yells at", syllables: 2},
    {text: "whips", syllables: 1},
    {text: "traps", syllables: 1},
    
    {text: "drags", syllables: 1},
    {text: "moves", syllables: 1},
    {text: "stops", syllables: 1},
    {text: "shifts", syllables: 1},
    {text: "bends", syllables: 1},
    
    {text: "bakes", syllables: 1},
    {text: "cooks", syllables: 1},
    {text: "cools", syllables: 1},
    {text: "boils", syllables: 1},
    {text: "brews", syllables: 1},
    {text: "burns", syllables: 1},
    {text: "fills", syllables: 1},
    {text: "melts", syllables: 1},
    {text: "salts", syllables: 1},
    {text: "smokes", syllables: 1},

    {text: "kisses", syllables: 2},
    {text: "calms", syllables: 1},
    {text: "cares for", syllables: 2},
    {text: "hugs", syllables: 1},
    {text: "cuddles", syllables: 2},
    {text: "chats with", syllables: 2},
    {text: "plays with", syllables: 2},
    {text: "winks at", syllables: 2},
    {text: "weeps for", syllables: 2},
    {text: "helps", syllables: 1},
    {text: "feeds", syllables: 1},
    {text: "licks", syllables: 1},
    {text: "washes", syllables: 2},
    {text: "cleans", syllables: 1},

    {text: "draws", syllables: 1},
    {text: "makes", syllables: 1},
    {text: "tints", syllables: 1},
    {text: "dyes", syllables: 1},

    {text: "buries", syllables: 2},
    {text: "glues", syllables: 1},
    {text: "frees", syllables: 1},
    {text: "flips", syllables: 1},
    {text: "folds", syllables: 1},
    {text: "fails", syllables: 1},
    {text: "leads", syllables: 1},
    {text: "leaves", syllables: 1},
    {text: "links", syllables: 1},
    {text: "loans", syllables: 1},
    {text: "lubes", syllables: 1},
    {text: "lures", syllables: 1},
    {text: "marks", syllables: 1},
    {text: "masks", syllables: 1},
    {text: "funds", syllables: 1},
    {text: "nails", syllables: 1},
    {text: "pairs", syllables: 1},
    {text: "rates", syllables: 1},
    {text: "rides", syllables: 1},
    {text: "rusts", syllables: 1},
];

const endNouns: UserUrlNoun[] = [
    {text: "dome", syllables: 1},
    {text: "cone", syllables: 1},
    {text: "drone", syllables: 1},
    {text: "loan", syllables: 1},
    {text: "phone", syllables: 1},
    {text: "stone", syllables: 1},
    {text: "tone", syllables: 1},
    
    {text: "bomb", syllables: 1},
    {text: "bong", syllables: 1},
    {text: "song", syllables: 1},
    {text: "gong", syllables: 1},

    {text: "bowl", syllables: 1},
    {text: "bone", syllables: 1},
    {text: "tomb", syllables: 1},
    {text: "storm", syllables: 1},
    {text: "comb", syllables: 1},
    {prefix: "some", text: "foam", syllables: 1},
    {text: "home", syllables: 1},

    {text: "loom", syllables: 1},
    {text: "rune", syllables: 1},
    {text: "fume", syllables: 1},
    {text: "dune", syllables: 1},

    {text: "hole", syllables: 1},
    {text: "goal", syllables: 1},
    {text: "troll", syllables: 1},
    {text: "ball", syllables: 1},
    {text: "stall", syllables: 1},

    {text: "board", syllables: 1},
    {text: "sword", syllables: 1},
    {text: "groin", syllables: 1},
    {text: "road", syllables: 1},
    {text: "boat", syllables: 1},
    {text: "load", syllables: 1},
    {text: "moat", syllables: 1},
    {text: "code", syllables: 1},

    {text: "drum", syllables: 1},
    {text: "bum", syllables: 1},
    {text: "ram", syllables: 1},
    {text: "tan", syllables: 1},
    {text: "gun", syllables: 1},
    {prefix: "some", text: "gum", syllables: 1},
    {prefix: "some", text: "rum", syllables: 1},
    {text: "mom", syllables: 1},
    {text: "run", syllables: 1},
    {prefix: "some", text: "fun", syllables: 1},

    {text: "cup", syllables: 1},
    {text: "pup", syllables: 1},
    {text: "lap", syllables: 1},
    {text: "gap", syllables: 1},
    {text: "hat", syllables: 1},
    {text: "rat", syllables: 1},
    {text: "bat", syllables: 1},
    {text: "cat", syllables: 1},
    {text: "vat", syllables: 1},
    {text: "map", syllables: 1},

    {text: "sock", syllables: 1},
    {text: "glock", syllables: 1},
    {text: "rock", syllables: 1},
    {text: "block", syllables: 1},
    {text: "dock", syllables: 1},
    {text: "duck", syllables: 1},
    {text: "lock", syllables: 1},

    {text: "lamb", syllables: 1},
    {prefix: "some", text: "grass", syllables: 1},
];

logger.silly("Loaded user URL parts:");
logger.silly(`${adjectives.length} adjectives`);
logger.silly(`${nouns.length} nouns`);
logger.silly(`${verbs.length} verbs`);
logger.silly(`${endNouns.length} end nouns`);
logger.silly(`Total number of combinations: ${adjectives.length * nouns.length * verbs.length * endNouns.length}`);

const pick = (parts: UserUrlPart[], filter?: (value: UserUrlPart|UserUrlNoun) => boolean) => {
    let list = parts;

    if (filter) {
        list = list.filter(filter);
    }

    return list[Math.floor(Math.random() * list.length)];
}

const getTotalSyllables = (parts: UserUrlPart[]) => {
    return parts.reduce((prev, curr) => {return prev + curr.syllables}, 0);
}

const generateUserUrl = (startSyllables = 2, middleSyllables = 2, endSyllables = 3) => {
    const out: string[] = [];

    // Start
    while (startSyllables > 0) {
        const adjective = pick(adjectives, (value) => { return value.syllables <= startSyllables });
        startSyllables -= adjective.syllables;
        out.push(adjective.text);
    }

    // Middle
    const noun = pick(nouns);
    middleSyllables -= noun.syllables;
    while (middleSyllables > 0) {
        const adjective = pick(adjectives, (value) => { return value.syllables <= middleSyllables });
        middleSyllables -= adjective.syllables;
        out.push(adjective.text);
    }
    out.push(noun.text);

    // End
    const verb = pick(verbs);
    out.push(verb.text);
    endSyllables -= verb.syllables;
    while (endSyllables > 0) {
    
        if (endSyllables === 1) {
            const endNoun = pick(endNouns, (value) => {
                if ((value as UserUrlNoun).pluralSyllables && (value as UserUrlNoun).pluralSyllables !== 1) return false;
                if (value.syllables === 1) return true;
                return false;
            })
            const pluralText = (endNoun as UserUrlNoun).plural ? (endNoun as UserUrlNoun).plural! : endNoun.text + "s";
            out.push(pluralText);
            break;
        }

        if (endSyllables === 2) {
            const endNoun = pick(endNouns, (value) => { return value.syllables === 1 })
            const prefix = (endNoun as UserUrlNoun).prefix ? (endNoun as UserUrlNoun).prefix! : "a";
            out.push(prefix);
            out.push(endNoun.text);
            break;
        }

        if (endSyllables === 3) {
            const adjective = pick(adjectives, (value) => value.syllables === 1);
            const endNoun = pick(endNouns, (value) => value.syllables === 1);
            const firstLetter = adjective.text[0];
            const prefix = "aeiouy".includes(firstLetter) ? "an" : "a";
            out.push(prefix);
            out.push(adjective.text);
            out.push(endNoun.text);
            break;
        }

        const anotherVerb = pick(verbs, (value) => value.syllables === 1);
        out.push("and");
        out.push(anotherVerb.text);
        endSyllables -= 2;
    }

    const outStr = out.join(" ");
    return outStr.split(" ").join("-");
}

export default generateUserUrl