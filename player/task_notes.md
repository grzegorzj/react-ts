## Tech/pattern choice

- TypeScript; reasoning here is quite abstract, I just felt like using TypesScript with React since I usually don't.
After 1 hour felt like a mistake (the challenge is supposed to have time limit, while TypeScript generated a few
issues that were not necessarily fast to solve nor strictly connected to the challenge itself).
- No state container like Redux or MobX, primarily because I felt like this would be a total overkill for sth that has 5 components.
- Component folder pattern, because clutter distracts me a lot.
- Classes for everything, even if stateless/doesn't take props. Reason for this is ease of automation further on in refactoring process, and generally
I like to cope with as little concepts in the codebase as possible

## Notes

- Using this endpoint for parsing N top artists (https://api-v2.hearthis.at/feed/?type=popular&page=1&count=5) might fail,
typically artist repeats on the list of most the popular tracks. I have chosen to fetch 20, obviously also can fail, but it's less likely.