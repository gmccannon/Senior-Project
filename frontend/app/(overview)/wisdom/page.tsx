"use client"

import React, { useState } from 'react';

const quotes = [
    "Good git commit messages are like unicorns: legends say they exist, but no one's ever seen one. - Anonymous Engineer",
    "Python insists whitespace matters, because why make code errors easy? - Code Poet",
    "Java: write once, debug everywhere. Your stack trace will thank you later. - Prof. Gaslighting",
    "JavaScript: where NaN is a number and typeof NaN is number. Reality optional. - Frontend Philosopher",
    "C++: giving you the power of direct memory access and the headache of manual deallocation. - Memory Miser",
    "C#: for when you want Java syntax with .NET's runtime quirks. - DLL Dealer",
    "Unit tests are like seat belts—they might slow you down, but you'll wish you had them in a crash. - Test Pilot",
    "Code reviews: the art of finding typos in variable names starting with 'i' or 'j'. - Review Overlord",
    "Git rebase: rewriting history so convincingly that even your past self forgets what happened. - History Rewriter",
    "Pull requests: where a missing semicolon becomes a public spectacle. - PR Star",
    "Agile: doing the wrong thing faster, one two-week sprint at a time. - Scrum Survivor",
    "SOLID: the five commandments no one actually follows. - Saint Refactor",
    "YAGNI: You Aren't Gonna Need It, but please add three abstractions anyway. - Agile Evangelist",
    "DRY: Don't Repeat Yourself… unless it’s quicker to copy‑paste. - Shortcut Specialist",
    "Documentation: the mythical tome no one dares to open. - Archivist",
    "CI/CD pipelines: the magical streams where builds go to die. - Pipeline Whisperer",
    "Debugging: when your code finally compiles, but nothing works as intended. - Bug Hunter",
    "Stack Overflow: where the only question is who actually understands the accepted answer. - Community Gardener",
    "Backlog grooming: a meeting that could have been an email, which was too much effort to write. - Scrum Skeptic",
    "Stand‑ups: daily 15‑minute marathons of 'What did you do?' and 'Why didn't I know?' - Meeting Minimalist",
    "Rubber duck debugging: because talking to a banana is more comforting than people. - Duck Whisperer",
    "Immutable data: because copying memory until your disk is full sounds fun. - State Fanatic",
    "Microservices: dividing one monolith into dozens of smaller, equally terrible services. - Service Decomposer",
    "Docker: packaging your failures into neat little containers. - Container Captain",
    "Kubernetes: orchestrating chaos at scale since forever. - Cluster Conductor",
    "DevOps: the evolution of throwing code over a wall to throwing code into a volcano. - Ops Survivor",
    "Pair programming: writing half as much code and twice as many arguments. - Collaboration Enthusiast",
    "Design patterns: solving problems you didn't know you had in a way no one can decipher. - Pattern Pedant",
    "Legacy code: a magical realm where comments lie and tests are fantasies. - Maintenance Wizard",
    "Missing newline at EOF: the hill that true coders will gladly die on. - Hardcore Minimalist"
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