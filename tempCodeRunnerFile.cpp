#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Enter two numbers: ";
    cin >> a >> b;

    // Addition
    int sum = a + b;
    cout << "Sum: " << sum << endl;

    // Subtraction
    int difference = a - b;
    cout << "Difference: " << difference << endl;

    // Multiplication
    int product = a * b;
    cout << "Product: " << product << endl;

    // Division
    if (b != 0) {
        double quotient = static_cast<double>(a) / b;
        cout << "Quotient: " << quotient << endl;
    } else {
        cout << "Division by zero is not allowed." << endl;
    }

    return 0;
}