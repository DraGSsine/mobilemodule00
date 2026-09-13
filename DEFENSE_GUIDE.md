# Mobile Module 00 — Defense Guide

This guide is based on version 2.4 of the subject and on the code currently in this repository. The project uses React Native with Expo instead of Flutter. The subject explicitly allows adapting Flutter concepts to an equivalent framework.

## SafeAreaProvider and SafeAreaView

### What problem do they solve?

A phone screen is not always a completely usable rectangle. Parts of it may be covered by:

- the iPhone notch or Dynamic Island;
- the status bar containing the clock, signal, and battery;
- rounded screen corners;
- an Android camera cutout;
- the home indicator or navigation area at the bottom.

The usable distance between those system areas and the application content is called a **safe-area inset**. There can be a different inset for the top, bottom, left, and right sides.

### What does SafeAreaProvider do?

`SafeAreaProvider` comes from `react-native-safe-area-context`. It is placed above the components that need safe-area information.

It:

1. reads the safe-area measurements supplied by the native operating system;
2. stores the top, right, bottom, and left inset values in React context;
3. makes those values available to its children.

It does not draw the AppBar, add calculator logic, or handle button touches. Think of it as the component that **provides the measurements**.

```tsx
<SafeAreaProvider>
  {/* Children can now use safe-area information. */}
</SafeAreaProvider>
```

It should normally appear once near the root of the application. A component that uses safe-area context must be inside this provider.

### What does SafeAreaView do?

`SafeAreaView` consumes the measurements supplied by `SafeAreaProvider`. It adds enough space around its content to keep it inside the usable part of the screen.

```tsx
<SafeAreaProvider>
  <SafeAreaView style={styles.container}>
    {/* This content avoids system UI and cutouts. */}
  </SafeAreaView>
</SafeAreaProvider>
```

The `SafeAreaView` used in this project is from `react-native-safe-area-context`, not the old React Native built-in component.

By default, it protects the edges of the view. The exact inset is device-dependent: an iPhone with a notch can have a larger top inset than a phone without one. This is why a fixed value such as `paddingTop: 40` is unreliable.

The safe-area space is added to any padding already defined on the view; it does not replace normal Flexbox layout.

### Why are both used here?

- `SafeAreaProvider` obtains and shares the measurements.
- `SafeAreaView` applies those measurements to the screen layout.
- `flex: 1` makes the safe view fill the available screen.
- The AppBar is inside the safe view, so its title is not hidden by the notch or status bar.

### Is this required by the subject?

The subject does not name these React Native components. It requires an AppBar at the top and a responsive display on different devices. Some form of safe-area handling is therefore necessary for a reliable top AppBar. These two components are the normal Expo/React Native solution.

They are useful in `ex02` and `calculator_app`, where content starts at the top. They are not essential in `ex00` and `ex01` because those screens center their content away from the system bars.

### Why not use StatusBar.currentHeight?

`StatusBar.currentHeight` is mainly an Android measurement. It is not a complete cross-platform solution and does not correctly represent every iPhone notch, bottom home indicator, landscape inset, or screen cutout. Safe-area insets are designed for those cases.

### Is “safe area” related to touch handling?

No. A `Button` or `Pressable` handles touches. Safe-area components only keep visual and interactive content away from screen areas where the operating system could cover it.

### Could we remove them?

The application may still appear correct on a simulator or a phone without a notch, but the top content can overlap system UI on other devices. Removing them would make the code slightly shorter but less responsive and less reliable.

---

## Questions common to the whole project

### Questions directly related to the subject

**Why did you use React Native when the introduction discusses Flutter?**  
The subject says framework-specific ideas must be adapted to the framework we choose. React Native supplies equivalent components and behavior.

**What is Expo?**  
Expo is tooling around React Native that creates, starts, bundles, and tests the mobile application with less native configuration.

**What is a component?**  
A component is a reusable function that returns a description of UI. `App` is the root component of each exercise.

**What is a widget in this React Native project?**  
The closest equivalent to a Flutter widget is a React component such as `View`, `Text`, or `Button`.

**Why does every exercise have its own project directory?**  
The subject requires `ex00`, `ex01`, `ex02`, and `calculator_app` as separate projects and turn-in directories.

**What makes the layouts responsive?**  
They use Flexbox and available screen space instead of fixed screen widths or heights. `flex: 1`, alignment properties, rows, and equal-width buttons adapt to the device.

**Where are debug messages displayed?**  
They appear in the terminal running Expo and in the development console, depending on how the app is launched.

**How do you run an exercise?**

```powershell
cd ex00
npm install
npx expo start
```

Use the corresponding directory for another exercise. Expo then offers Android, iOS, or supported development targets.

### Questions outside the subject

**What is JSX/TSX?**  
It is syntax that lets TypeScript describe a component tree using tags such as `<View>` and `<Text>`. `.tsx` means the file contains TypeScript and JSX.

**Why must plain text be inside Text?**  
React Native requires visible text to be rendered by a `Text` component; it does not use HTML elements such as `p` or `span`.

**What is StyleSheet.create?**  
It groups named React Native style objects and helps validate their property names. React Native styles are JavaScript objects, not CSS files.

**What is a prop?**  
A prop is an input passed to a component. Examples are `title`, `onPress`, and `style`.

**What does export default mean?**  
It makes `App` the main exported value of the file so the entry file can import and register it.

**What does index.ts do?**  
It is the entry point. It imports `App` and registers it with Expo/React Native.

**What is package.json?**  
It describes the project, scripts, and direct dependencies.

**What is package-lock.json?**  
It records exact dependency versions so installations are reproducible.

**Why should node_modules not be committed?**  
It is large, generated by `npm install`, and reproducible from `package.json` and `package-lock.json`.

**What is the difference between React Native and React for the web?**  
They share React concepts such as components, props, state, and hooks. React Native renders native components such as `View` and `Text`, not HTML DOM elements.

---

## Exercise 00 — A basic display

### What the subject requires

- A separate `ex00` project.
- One text element with a button below it.
- Both centered horizontally and vertically.
- Pressing the button logs `Button pressed`.
- A responsive layout.

### Likely subject questions

**Where are the text and button created?**  
Inside the JSX returned by `App`, using `Text` and `Button`.

**How is the button placed below the text?**  
A React Native `View` uses a vertical direction by default, so its children appear from top to bottom.

**How are both elements centered horizontally?**  
`alignItems: 'center'` centers children on the cross axis. With the default vertical direction, the cross axis is horizontal.

**How are both elements centered vertically?**  
`justifyContent: 'center'` centers children on the main axis. With the default vertical direction, the main axis is vertical.

**Why is flex: 1 necessary?**  
It makes the container occupy the available screen. Without that height, vertical centering would only happen inside the content-sized container.

**What happens when the button is pressed?**  
React Native calls `handlePress`, which executes `console.log('Button pressed')`.

**Why is onPress given handlePress instead of handlePress()?**  
`handlePress` passes the function for later execution. `handlePress()` would execute immediately while rendering.

**Why is this screen responsive?**  
It uses the screen’s available space and Flexbox alignment, with no fixed device dimensions.

### Possible questions outside the subject

**Does clicking the button rerender the screen?**  
The handler logs a message but changes no props or state, so no visible update is requested.

**Could the handler be written inline?**  
Yes: `onPress={() => console.log('Button pressed')}`. A named handler is easier to read and explain.

**Why use an arrow function for handlePress?**  
It is a normal JavaScript function syntax and fits well inside a function component.

**What is backgroundColor: '#fff'?**  
It sets the container background to white. `#fff` is shorthand for `#ffffff`.

**Is SafeAreaView required here?**  
No. The small UI is centered, so it does not approach the top or bottom unsafe areas.

### Quick defense demonstration

1. Launch `ex00`.
2. Show that the text and button are centered.
3. Press the button.
4. Show `Button pressed` in the debug console.

---

## Exercise 01 — Say Hello to the World

### What the subject requires

- Start from the previous exercise in a new `ex01` project.
- Initially display the original text.
- Change it to `Hello World!` after a press.
- Toggle between both texts on every press.

### Likely subject questions

**What was added compared with ex00?**  
State was added with `useState`, and the text now depends on that state.

**What does useState(false) return?**  
It returns the current state value and a setter function. Here they are named `buttonPressed` and `setButtonPressed`.

**What does false mean initially?**  
The button has not yet been pressed into the alternate state, so the initial text is displayed.

**How does the text toggle?**  
The setter receives the previous boolean value and returns its opposite: `setButtonPressed((wasPressed) => !wasPressed)`.

**Why use the previous-state callback?**  
The next value depends on the previous value. The callback always receives the correct previous state, even if React groups updates.

**How does the correct text get selected?**  
The ternary expression displays `Hello World!` when `buttonPressed` is true and `A simple text` when it is false.

**Why does the screen update after setButtonPressed?**  
Updating state asks React to rerender the component. The new boolean produces the other text.

**Does it still print the required debug message?**  
Yes. `handlePress` logs `Button pressed` before updating the state.

### Possible questions outside the subject

**Why would a normal local variable not work?**  
A local variable is recreated during rendering, and changing it does not tell React to update the UI. State persists between renders and triggers updates.

**What is a React hook?**  
A hook is a function that gives a function component a React feature. `useState` gives it state.

**What are the basic rules of hooks?**  
Call hooks at the top level of a React function component or custom hook, not inside loops, conditions, or nested callbacks.

**Could you write setButtonPressed(!buttonPressed)?**  
Yes for this simple click. The callback form is safer whenever the new value depends on the old value.

**Does useState update the variable immediately in the current handler?**  
It schedules an update. The new value is available on the next render.

**What does the exclamation mark before wasPressed do?**  
It is JavaScript boolean negation: true becomes false and false becomes true.

### Quick defense demonstration

1. Show the initial text.
2. Press once and show `Hello World!`.
3. Press again and show the original text.
4. Show both debug messages in the console.

---

## Exercise 02 — More Buttons

### What the subject requires

- A separate `ex02` project.
- An AppBar titled `Calculator`.
- Two text elements, initially displaying `0` and `0`.
- Buttons for digits `0` through `9`.
- Buttons for `.`, `AC`, `C`, `=`, `+`, `-`, `*`, and `/`.
- Every button must print its own label in the debug console.
- The display must respond to phones and tablets.
- Calculator behavior is not required yet.

### Likely subject questions

**Where is the AppBar?**  
React Native has no Flutter `AppBar` component. A styled `View` at the top is the equivalent, and its `Text` title is `Calculator`.

**Why does the AppBar use SafeAreaView?**  
It starts at the top of the screen, so safe-area handling prevents its title from being hidden by system UI or a notch.

**Why do the two text elements always show zero?**  
That is exactly what exercise 02 requests. The calculation logic belongs to `calculator_app`.

**Are all required buttons present?**  
Yes: ten digits, the decimal point, two clearing buttons, equals, and four operators.

**How does each button log the correct value?**  
`renderBtn` receives a string and creates `onPress={() => console.log(value)}`. The arrow function remembers that button’s value.

**What does value: string mean?**  
It is a TypeScript annotation requiring the helper argument to be text.

**Why does renderBtn return a View around Button?**  
The wrapper supplies `flex` and margin because the built-in `Button` has limited styling options.

**What does flexDirection: 'row' do?**  
It changes a row container’s main axis from vertical to horizontal, placing its buttons side by side.

**Why do buttons have flex: 1?**  
Every button wrapper in a row receives an equal share of the available width.

**What does the results flex: 1 do?**  
It takes the remaining vertical space between the AppBar and controls, helping the layout adapt to screen height.

**Why is the result aligned to the right?**  
`alignItems: 'flex-end'` places the text at the end of the horizontal cross axis, like a conventional calculator display.

**How is this responsive without checking device dimensions?**  
Rows use the available width, buttons share it using Flexbox, and the results section fills remaining height. Safe-area values adapt to the device.

### Possible questions outside the subject

**Why use a helper function instead of repeating every complete Button?**  
It avoids repeating the same wrapper, style, and logging logic while keeping the rows visually explicit.

**Could the buttons be generated from an array?**  
Yes. That approach is used in `calculator_app`. The explicit exercise 02 layout is also valid and easy for a beginner to trace.

**Why use Button instead of Pressable or TouchableOpacity?**  
`Button` provides working native press behavior with very little code. `Pressable` allows more visual customization but needs more code.

**What is a closure in this code?**  
The function passed to `onPress` retains access to the `value` given to that particular `renderBtn` call.

**What is the difference between margin and padding?**  
Margin adds space outside a view; padding adds space between a view’s boundary and its children.

**Why is minWidth: 0 used on the button wrapper?**  
It allows a flexible child to shrink within a row instead of forcing the row wider on small screens.

**Would hard-coded button widths be responsive?**  
Not across different phones and tablets. Equal flex values are safer.

**Why not use FlatList?**  
This is a small, fixed grid. Nested `View` rows are simpler; `FlatList` is mainly useful for larger or scrolling collections.

### Quick defense demonstration

1. Show the AppBar and both zero values.
2. Count the digit and operator buttons.
3. Press several different buttons and show that each label is logged.
4. Rotate or resize the target if available and show that rows still fit.

---

## Exercise 03 — calculator_app: It’s Alive!

### What the subject requires

- Copy the previous work into a project named `calculator_app`.
- Display the entered expression and its result.
- Support addition, subtraction, multiplication, and division.
- Support several operations in one expression.
- Make the decimal button from exercise 02 functional as part of the calculator.
- `C` deletes the last expression character.
- `AC` clears the expression and result.
- Incorrect expressions, division by zero, and very large values must never crash the app.
- An equivalent expression library is allowed.

### Likely subject questions

**Why is there no calculator.ts file?**  
The subject does not require it. The logic is short enough to keep in `App.tsx`, which is easier for this beginner project. A separate file would only be an organization choice.

**Why use mathjs?**  
The subject explicitly allows `math_expressions` or an equivalent library. `mathjs` is the JavaScript equivalent used to parse and calculate the expression safely.

**Why not use JavaScript eval?**  
`eval` executes arbitrary JavaScript, not just calculator mathematics. A math expression parser is safer and correctly handles operator precedence.

**What is BUTTON_ROWS?**  
It is an array of rows. Each inner array contains the labels that appear in one visual calculator row.

**Why generate the buttons with map?**  
Every button has the same structure. `map` converts the row data into `View` and `Button` components without duplicating markup.

**Why do mapped elements need key?**  
React uses keys to identify list items between renders. Button labels are unique within each row, and the static row index identifies each fixed row.

**What state does the calculator store?**  
`expression` stores what the user has entered. `result` stores the displayed answer or `Error`.

**Why are expression and result strings?**  
Button input arrives as characters and must be displayed exactly. The evaluated number is converted back to a string for display.

**What does expression || '0' mean?**  
An empty string is falsy, so the display shows `0` when no expression exists. Otherwise it shows the expression.

**What happens for a normal digit, dot, or operator?**  
Its label is appended to the expression using `setExpression(expression + value)`.

**What does AC do?**  
It sets the expression to an empty string and the result to `0`, clearing everything.

**What does C do?**  
`expression.slice(0, -1)` returns the expression without its last character.

**What happens if C is pressed on an empty expression?**  
Slicing an empty string still returns an empty string, so nothing crashes.

**What does = do?**  
It passes the expression to `evaluate`, validates the returned value, and displays the answer as text.

**How are multiple operations supported?**  
The complete expression is evaluated at once. `mathjs` applies normal precedence, so multiplication and division happen before addition and subtraction.

**How can the user enter a negative number?**  
The minus label is appended like any operator. Expressions such as `-5+2` and `5*-2` are understood by `mathjs`.

The subject explicitly requires subtraction but does not separately say “support unary negative input.” An evaluator may still test it as a sensible calculator edge case, and the current implementation supports it.

**How are decimals supported?**  
The decimal point is appended to the expression, and `mathjs` evaluates valid values such as `1.5+2.25`.

**Why is evaluate inside try/catch?**  
Malformed expressions can throw an exception. `catch` converts that failure into the visible text `Error`, so the application does not crash.

**Why also use Number.isFinite?**  
Division by zero can produce `Infinity` instead of throwing. `Number.isFinite` rejects `Infinity` and `NaN`, and the code then displays `Error`.

**Why check typeof answer?**  
The calculator display expects a normal JavaScript number. The check rejects other kinds of values a general math library could return.

**What happens to the expression after =?**  
It remains visible, while the result area shows the answer. The subject requires both expression and result displays and does not require replacing the expression.

**Does every button still log its label?**  
Yes. `console.log(value)` is the first instruction in `handlePress`.

### Possible questions outside the subject

**What is the difference between map and forEach?**  
`map` returns a new array, which is useful for producing React elements. `forEach` performs work but does not return the generated array.

**What does try/catch do?**  
Code that might throw runs in `try`. If it throws, execution moves to `catch` instead of terminating the app.

**What does throw new Error() do here?**  
It deliberately moves invalid non-finite results into the existing `catch` path.

**Why call answer.toString()?**  
The library returns a number, while the React Native `Text` display state is stored as a string.

**What is operator precedence?**  
It is the order in which operations are evaluated. For example, `1+2*3` equals `7`, not `9`, because multiplication comes first.

**What is Number.isFinite(Infinity)?**  
It is false. This is how the app recognizes a result that should not be displayed as a valid number.

**Why not manually write an expression parser?**  
It would require substantially more code for precedence, unary minus, decimals, and malformed input. The subject allows a library, so using one is simpler and safer.

**Could the UI validate every invalid button sequence before evaluation?**  
Yes, but that adds much more code. This project accepts the sequence and safely displays `Error` when it cannot be evaluated, which meets the never-crash requirement.

**What is a stale state value?**  
React state in a handler belongs to the render that created that handler. For updates that depend on many queued updates, the callback form such as `setExpression((old) => old + value)` is safest. Ordinary separate button presses are handled correctly by the current simple version.

**Why are rowIndex keys acceptable here?**  
The calculator rows are static and never reordered, inserted, or removed. For dynamic lists, a stable data identifier is preferable.

**Does mathjs increase the application size?**  
Yes, it adds a dependency. Here the benefit is reliable parsing with far less custom code, and the subject explicitly permits an expression library.

### Expressions to demonstrate during defense

| Purpose | Input | Expected result |
|---|---:|---:|
| Addition | `2+3` | `5` |
| Subtraction | `7-10` | `-3` |
| Multiplication | `4*5` | `20` |
| Division | `8/2` | `4` |
| Precedence | `1+2*3-5/2` | `4.5` |
| Initial negative | `-5+2` | `-3` |
| Negative after operator | `5*-2` | `-10` |
| Decimal | `1.5+2.25` | `3.75` |
| Delete | enter `123`, press `C` | `12` |
| Clear | enter anything, press `AC` | expression `0`, result `0` |
| Invalid input | `1++` then `=` | `Error` |
| Division by zero | `1/0` | `Error` |

### Quick defense demonstration

1. Enter digits and operators while showing the debug log.
2. Evaluate the precedence example.
3. Test an initial negative number and a decimal number.
4. Demonstrate `C` and `AC`.
5. Evaluate `1/0` and malformed input to prove the app does not crash.

---

## Final submission checklist

- The repository contains `ex00`, `ex01`, `ex02`, and `calculator_app` with those exact names.
- Each directory contains its required source and project files.
- `node_modules` and local generated files are ignored by Git.
- Each project installs and starts on the evaluation computer.
- Debug logs use the exact required text or button label.
- All exercise 02 buttons are present.
- The calculator handles all four operators, multiple operations, negatives, decimals, delete, clear, invalid expressions, and division by zero.
- Only repository contents are evaluated, so all intended changes must be committed and pushed before the deadline.

## Thirty-second project explanation

“I used React Native with Expo as the framework equivalent permitted by the subject. Exercise 00 builds a centered static interface and logs a button press. Exercise 01 adds boolean state to toggle the text. Exercise 02 builds a responsive calculator interface and logs every button. The final project stores the expression and result in state, generates the buttons from arrays, and uses mathjs to evaluate valid expressions. Errors and non-finite results are caught so the application never crashes. Safe-area components keep the top AppBar and controls away from notches and system UI on different devices.”
