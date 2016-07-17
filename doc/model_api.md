# Model API

## pot

Module to manage the amount of money in the pot and distribute it. It is a factory function that returns an instance.

### pot (factory function)

Factory function to return a pot instance.

#### Signature

```
pot(startingAmount)
```

#### Arguments

- startingAmount: Starting amount of the pot instance.

#### Return Value

A pot instance.

### add (instance method)

Method of the pot instance to add money to the pot.

#### Signature

```
add(amount)
```

#### Arguments

- amount: Amount of money to add to the pot. Must be greater or equal to 0 (you can't use this method to substract from the pot).

#### Return Value

None

### award, unordered version  (instance method)

Method of the pot instance to award money from the pot.

#### Signature

```
add(ratios)
```

#### Arguments

- ratios: This is an object taking for keys names and their values ratios of the pot to award. The rations must be greater or equal to 0 and must sum to a value less than or equal to 1. 

Ex:
```
{'eric': 0.375, 'kevin': 0.075, 'lewis': 0.05} 

```

#### Return Value

An array with the same key as the input and for each key, the value is the amount of money awarded (ie, the corresponding ratio of the pot). Obviously, the money will also be substracted from the pot.

### award, ordered version  (instance method)

Method of the pot instance to award money from the pot.

#### Signature

```
add(ratios)
```

#### Arguments

- ratios: This is an ordered array of user/ratio mappings of the form [{'name': .., 'ratio': ..}, ..]

Ex:
```
[{'name': 'eric', 'ratio': 0.375}, {'name': 'kevin', 'ratio': 0.075}, {'name': 'lewis', 'ratio': 0.05}]
```

#### Return Value

An array of ordered objects with the name values preserved, but the ratio property replaced by the 'award' property with the actual amount of money won. Obviously, the money will also be substracted from the pot.

### get

Method of the pot instance to inspect the amount in the pot.

#### Signature

```
get()
```

#### Arguments

None

#### Return Value

The amount of money in the pot

## draw

Module that randomly generates a draw. It is callable directly.

### Signature

```
generate(balls, draws)
```

### Arguments

- balls: Number of balls to pick, numbered from 1 to N, where N is the number of balls
- draws: Number of balls that are drawn

### Return Value

A array containing, in order they were drawn, the drawn values.

## participants

Module that keeps track of participants and their numbers. It is a callable factory function that returns an instance.

### participants (factory function)

Factory function that returns an instance.

#### Signature

```
participants(balls)
```

#### Arguments

- balls: Number of balls that are assigned to participants. Values range from 1 to N, where N is the number of balls.

### add (instance method)

Method of a participants instance. It adds a participant to the list of participants and assign him a number.

#### Signature

```
add(name)
```

#### Arguments

- name: Name of the participant

#### Return Value

Number of the ball that was assigned to the participant

### getWinnings (instance method)

Method of a participants instance. It returns the winning ratios of each candidate

#### Signature

```
getWinnings(ratios)
```

#### Arguments

- ratios: An array containing objects of the form {'number': ..., 'ratio': ...}, where the number key represents a winning number and the ratio key represents the corresponding winning ratio.

#### Return Value

An object having for keys the names of the winners and for values, their ratio of the winning.

### getNames (instance method)

Method to get a list of names representing the participants so far.

#### Signature

```
getNames()
```

#### Arguments

None

#### Return Value

List of names representing the participants

### getRanks (instance method)

Get a ranking of the participants given a particular set of ordered draws.

#### Signature

```
getRanks(draws)
```

#### Arguments

- draws: A ranked array indicating the balls draws in order (ex: [25, 13, 21]);

#### Return Value

A array of ordered names corresponding to the participant in each rank. A particular position in the array can be null if no participant drew a particular ball.
