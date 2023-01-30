//global N: Field = 5;
//global PUZZLE_SIZE = 4;

fn main(puzzle: [u4;4], user_input: pub [u4;4]) {
    let res = check_puzzle(puzzle, user_input);
    constrain res == true;
} 

//check the solution corresponds to the puzzle:
fn check_puzzle(puzzle: [u4;4], user_input: [u4;4]) -> bool {
    for i in 0..2 {
        for j in 0..2 {
            constrain (user_input[2*i+j] == 0) | (user_input[2*i+j] == puzzle[2*i+j]) ;
        };
    };
	true
}

