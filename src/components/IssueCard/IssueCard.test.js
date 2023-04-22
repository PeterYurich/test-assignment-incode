import { render } from "@testing-library/react/types";
import IssueCard from "./IssueCard";

describe(IssueCard, () => {
    it("IssueCard displays correct time difference"), () => {
        const { getByTestId } = render (<IssueCard content={{
                title: "asdf", 
                number: 321321,
                openedAt: '22.04.2023', 
                author: 'qwer', 
                comments: 5
        }} />)
        const timeDiff = String(getByTestId(time).textContent)
    }
})
