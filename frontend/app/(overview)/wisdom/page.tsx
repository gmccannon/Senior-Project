"use client"

import React, { useState } from 'react';

const quotes = [
    "Good git commit messages are like unicorns: legends say they exist, but no one's ever seen one. - Anonymous Engineer",
    "Python insists whitespace matters, because why make code errors easy? - Code Poet",
    "Java: write once, debug everywhere. Your stack trace will thank you later. - Prof. Gaslighting",
    "C++: giving you the power of direct memory access and the headache of manual deallocation. - Memory Miser",
    "C#: for when you want Java syntax with .NET's runtime quirks. - DLL Dealer",
    "Unit tests are like seat belts—they might slow you down, but you'll wish you had them in a crash. - Test Pilot",
    "Git rebase: rewriting history so convincingly that even your past self forgets what happened. - History Rewriter",
    "Agile: doing the wrong thing faster, one two-week sprint at a time. - Scrum Survivor",
    "SOLID: the five commandments no one actually follows. - Saint Refactor",
    "YAGNI: You Aren't Gonna Need It, but please add three abstractions anyway. - Agile Evangelist",
    "DRY: Don't Repeat Yourself… unless it's quicker to copy-paste. - Shortcut Specialist",
    "Documentation: the mythical tome no one dares to open. - Archivist",
    "Debugging: when your code finally compiles, but nothing works as intended. - Bug Hunter",
    "Stack Overflow: where the only question is who actually understands the accepted answer. - Community Gardener",
    "Stand-ups: daily 15-minute marathons of 'What did you do?' and 'Why didn't I know?' - Meeting Minimalist",
    "Microservices: dividing one monolith into dozens of smaller, equally terrible services. - Service Decomposer",
    "Pair programming: writing half as much code and twice as many arguments. - Collaboration Enthusiast",
    "Design patterns: solving problems you didn't know you had in a way no one can decipher. - Pattern Pedant",
    "Legacy code: a magical realm where comments lie and tests are fantasies. - Maintenance Wizard",
    "Missing newline at EOF: the hill that true coders will gladly die on. - Hardcore Minimalist",
    "Technical debt: the interest you pay for not refactoring yesterday. - Debt Collector",
    "Refactoring: the art of making your code worse in a more elegant way. - Refactor Artist",
    "Code reviews: where your code is judged by people who don't understand it. - Review Judge",
    "Agile: the art of pretending to be productive while doing nothing. - Agile Illusionist",
    "Scrum: the framework that makes you feel busy while achieving nothing. - Scrum Mastermind",
    "I don't care if you have a PhD, if you can't write a simple function, you're useless. - Code Snob",
    "Code reviews: where you learn that your code is not as good as you thought. - Review Reality Check",
    "I don't care if you have a million lines of code, if it's not maintainable, it's garbage. - Code Purist",
    "Code is like a relationship: if you don't take care of it, it will break. - Code Therapist",
    "Code is like a child: if you don't discipline it, it will grow up to be a monster. - Code Parent",
    "Code is like a garden: if you don't weed it, it will become a jungle. - Code Gardener",
    "Code is like a car: if you don't maintain it, it will break down. - Code Mechanic",
    "Code is like a house: if you don't clean it, it will become a dump. - Code Cleaner",
    "Code is like a diet: if you don't stick to it, it will go off the rails. - Code Dietitian",
    "I don't care if you're a genius, you're not a genius in this class.",
    "I don't care if you have a 4.0 GPA, if you can't write code, you're useless. - Code Snob",
    "You should see the amount of issues I have [with your github repos], I should be sent to an asylum",
    "Maybe I'm getting better at teaching this class. People are giving up sooner",
    "I don't know what they are thinking, but that's a STUPID idea",
    "I get depressed when I look at Brightspace",
    "The world is drowning in insignificant Python code",
    "(Roasts Python a lot)",
    "(Roasts Java even more)",
    "Never hire Python programmers for a Python job",
    "Hire C programmers instead of Java programmers",
    "LLMs are based on bad code. There is a lot of bad code in GitHub",
    "Think of the perspective of the client. No one cares if it's a pain in the ass for you. They care if it works",
    "If I make mistakes like this, there's no way you have a chance",
    "A C is an F in grad school",
    "If they can't handle this, then they shouldn't be computer science majors",
    "These are graduates... well not really. All they know is Java",
    "150 reasons why Java is stupid",
    "Being different even if you are right is not good",
    "(Insults ChatGPT but still uses it)",
    "CentOS is such a dead program (talks about how dead it is for five minutes)",
    "Instead of guessing, experiment",
    "You are so wrong, it's hilarious",
    "Python rots your brain",
    "Get to the point with your emails",
    "If you do ... then you should be FIRED!",
    "I want you to realize the error in your ways",
    "I want to sow doubt in everything you do",
    "CIS will be replaced by ChatGPT, and so will some of CS",
    "I spend 90% of my time dealing with crap, so I'll give you a zero and spend my time marking people off for misspelling things",
    "The right way is what your boss wants. The wrong way is not what the boss wants. The wrong way leads to unemployment. No matter what your moral high ground is, I don't care.",
    "Even compilers mess up",
];


const WisdomPage = () => {
    const [quote, setQuote] = useState<string | null>(null);

    const getQuoteOfTheDay = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {/* <h1>Quote of the Day</h1> */}
            <button
                onClick={getQuoteOfTheDay}
                className="px-4 py-2 text-black bg-white rounded"
            >
                Get Quote
            </button>
            {quote && <p style={{ marginTop: '20px', fontStyle: 'italic' }}>{quote}</p>}
        </div>
    );
};

export default WisdomPage;