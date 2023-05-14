import { jobDescriptionAgent } from "./jobDescriptionAgent";
import { describe, it, expect } from 'vitest'

describe('jobDescriptionAgent', () => {
  it('should return an object with messages and max_tokens properties', () => {
    const context = { position: 'Software Engineer' };
    const result = jobDescriptionAgent(context);
    expect(result).to.have.property('messages');
    expect(result).to.have.property('max_tokens');
  });
  
  it('should return the correct message when tasks are provided', () => {
    const context = { position: 'Software Engineer', tasks: 'coding, debugging, testing' };
    const result = jobDescriptionAgent(context);
    expect(result.messages).toBeDefined()
    if (result.messages) {
      expect(result.messages[1].content).to.equal('Create a job description for Software Engineer. The job description should include the tasks performed in this position, such as: coding, debugging, testing');
    }
  });
  
  it('should return the correct message when tasks are not provided', () => {
    const context = { position: 'Software Engineer' };
    const result = jobDescriptionAgent(context);
    expect(result.messages).toBeDefined()
    if (result.messages) {
      expect(result.messages[1].content).to.equal('Create a job description for Software Engineer.');
    }
  });
});